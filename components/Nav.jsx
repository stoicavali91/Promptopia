
"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut,useSession, getProviders} from 'next-auth/react'

const Nav = () => {


  const {date: session} = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () =>{
      const response = await getProviders();
      setProviders(response);
    }
  
   setUpProviders();
  },[])
  

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg" 
          alt="promptopia Logo"
          width={30} 
          height={30} 
          className="object-contain" 
        />
        <p className="logo_text"> Promptopia</p>
      </Link>


      {/* DESKTOP NAVIGATION */}
      {/* a menu that is visible only on small devices */}
      <div className="sm:flex hidden"> 
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Post</Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image 
                src="assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile" 
              
              />
            </Link>
          </div>
        ):(
          <>
            {providers && 
            Object.values(providers).map((provider)=>(
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src="assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile" 
              // it is not recommended to set the setState with (!State), so we are setting it with a callback function that sets the State with !prev
              onClick={()=> setToggleDropdown((prev) => !prev)} 
            />

            {/* if toggleDropdown is true, we return the next div that has an onClick property. If clicked, it sets the toggleDropdown to false */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>My profile</Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                <button type="button" onClick={() => {toggleDropdown(false); signOut()}} className="mt-5 w-full black_btn">Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && 
            Object.values(providers).map((provider)=>(
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
    )
}

export default Nav