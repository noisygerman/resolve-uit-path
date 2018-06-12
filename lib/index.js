const path     = require( 'path' );
const rootPath = process.cwd();
const DefaultExtension = '.test.js';

function createResolveUitPath( { specFileExtension = DefaultExtension } = {} ){

  /**
   * Generates the path to the unit-in-test based on the path of the spec file
   *
   * For example, if the spec is located at 'spec/foo/bar/baz.test.js', then the
   * path generate by this script is '../../foo/bar/baz.js'
   *
   * @param { string } specPath - The path to the spec
   *
   * @returns { string } The path to the unit-in-test relative to the specPath
   **/
  function resolveUitPath( specPath ){

    const specDirPath
      = path.dirname( specPath );

    const relativeToRoot
      = path.relative( rootPath, specDirPath );

    const rootRelativeToSpec
      = path.relative( specDirPath, rootPath );

    const basename
      = path.basename( specPath, specFileExtension );

    // end of 'spec/'
    const specDirEnd
      = relativeToRoot.indexOf( path.sep ) + 1;

    const uitDirname
      = relativeToRoot.substring( specDirEnd );

    return path.join( rootRelativeToSpec, uitDirname, `${ basename }.js` );

  }

  return resolveUitPath;

}

module.exports                  = createResolveUitPath;
module.exports.DefaultExtension = DefaultExtension