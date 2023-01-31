import React from 'react';




const loginLink = () => {

  /*
    const authByLoginLink: ( authLoginLink: string ) => Promise<{ token: string, refreshToken: string }>
      = ( authLoginLink: string ) => Promise.resolve( { token: 'test', refreshToken: 'test' } )
  */

  async function authByLoginLink() {
    const resolve: ( { token: string, refreshToken: string } ) = await ( { token: 'test', refreshToken: 'test' } )
    return resolve
  }

  async function go() {
    let a = await   authByLoginLink()
    console.log( a )
  }

  go()

  return (
    <>
      loginlink
    </>
  );
};

export default loginLink;