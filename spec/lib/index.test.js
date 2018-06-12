describe( 'The resolveUitPath function', ()=>{

  const path
    = require( 'path' );
  
  const uitPath
    = path.join( '..', '..', 'lib', 'index.js' );
  
  const createResolvePathToUnitInTest
    = require( uitPath );

  it( 'should generate a path relative to the file path provided', ()=>{

    const resolvePathToUnitInTest = createResolvePathToUnitInTest();

    expect( resolvePathToUnitInTest( __filename ) )
      .to.equal( uitPath );

  } );

  it( 'should allow to define alternate file extensions', ()=>{

    const { DefaultExtension } = createResolvePathToUnitInTest;
    const alternateExtension = '-spec.js';

    const specPathWithAlternateExtension = __filename.replace( DefaultExtension, alternateExtension );
    const resolvePathToUnitInTest = createResolvePathToUnitInTest( { specFileExtension: alternateExtension } );

    expect( resolvePathToUnitInTest( specPathWithAlternateExtension ) )
      .to.equal( uitPath );

  } );

} );

