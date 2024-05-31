import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, signInWithRedirect } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs,doc, getDoc, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseapp = initializeApp(firebaseConfig);
const firebaseauth = getAuth(firebaseapp);
const firestore = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(firebaseauth, (user) => {
            setUser(user || null);
        });
    }, []);

    const signupUserWithEmailAndPassword = async (email, password) => {
        setLoading(true); // Set loading to true during signup
        try {
            const result = await createUserWithEmailAndPassword(firebaseauth, email, password);
            setLoading(false); // Set loading to false on success
            return result;
        } catch (error) {
            setLoading(false); // Set loading to false on error
            throw error;
        }
    };

    const signinUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseauth, email, password);
    };

    const signinWithGoogle = () => {
        try {
            // Check if the device is mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // If the device is mobile, use redirect flow
            if (isMobile) {
                const result = await signInWithRedirect(firebaseauth, googleProvider);
                // You can handle the redirect result if needed
            } else {
                // For non-mobile devices, use popup flow
                const result = await signInWithPopup(firebaseauth, googleProvider);
                // You can handle the popup result if needed
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName || user.email.split('@')[0], // Fallback to email prefix if displayName is null
            photoURL: user.photoURL || '', // Fallback to an empty string if photoURL is null
        });
    };

    const listAllBooks = () => {
        return getDocs(collection(firestore, 'books'));
    };

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
    };

    const addUserDetails = (userId, userDetails) => {
        return addDoc(collection(firestore, 'users'), {
            userId,
            ...userDetails
        });
    };
    const getUserDetails = async (userId) => {
        const userDoc = await getDoc(doc(firestore, 'users', userId));
        return userDoc.exists() ? userDoc.data() : null;
    };
    const getUserBooks = async (userId) => {
        const q = query(collection(firestore, 'books'), where('userID', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };
    const listAllUsers = async () => {
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        return usersSnapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
    };
    const getBookById = async (id) => {
        const docRef = doc(firestore, 'books',id);
        const result = await getDoc(docRef);
        return result;
    }

    const getUserCount = async () => {
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        return usersSnapshot.size;
    };

    const logout = () => {
        return signOut(firebaseauth);
    };

    return (
        <FirebaseContext.Provider
            value={{
                user,
                setUser, // Expose setUser to allow state updates
                signinWithGoogle,
                signupUserWithEmailAndPassword,
                signinUserWithEmailAndPassword,
                handleCreateNewListing,
                listAllBooks,
                listAllUsers,
                getImageURL,
                getUserDetails,
                getUserBooks,
                addUserDetails,
                loading,
                getBookById,
                getUserCount,
                logout,
                isLoggedIn: !!user // Expose isLoggedIn for convenience
            }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};
