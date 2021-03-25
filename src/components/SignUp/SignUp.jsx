import React, { useRef } from "react";
import { auth } from "../../firebase";
//CSS
import "./SignUp.css";

const SignUp = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    //Auth Functions
    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(authUser => console.log(authUser)
        ).catch( e => alert(e.message))
    };

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
            ).then(authUser => {
                console.log(authUser);
                localStorage.setItem('email', authUser.user.email);
                
            }).catch( e => alert(e.message))
    };

    return (
        <div className="signup">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
                <button onClick={signIn} type="submit">
                    Sign In
                </button>
                <h4>
                    <span className="signup__gray">New to Netflix? </span>
                    <span className="signup__link" onClick={register}>
                        Sign Up now.
                    </span>
                </h4>
            </form>
        </div>
    );
};

export default SignUp;
