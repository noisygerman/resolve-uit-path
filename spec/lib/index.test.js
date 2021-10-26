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


  it( 'support spec dirs at locatations other than the root of the path', ()=>{

    const resolvePathToUnitInTest = createResolvePathToUnitInTest();

    const specPath = path.join( 'lib', 'subfolder', 'spec', 'index.test.js' )

    expect( resolvePathToUnitInTest( specPath ) )
      .to.equal( path.join( '..', '..', '..', 'lib', 'subfolder', 'index.js' ) );

  } );


  it( 'support spec dirs with names other than "spec"', ()=>{

    const { DefaultSpecDirName } = createResolvePathToUnitInTest;
    const alternateSpecDirName = 'test';

    const specPathWithAlternateSpecDirName = __filename.replace( DefaultSpecDirName, alternateSpecDirName );
    const resolvePathToUnitInTest = createResolvePathToUnitInTest( { specDirName: alternateSpecDirName } );

    expect( resolvePathToUnitInTest( specPathWithAlternateSpecDirName ) )
      .to.equal( uitPath );

  } );


  

} );

