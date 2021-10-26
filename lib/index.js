const path     = require( 'path' );
const rootPath = process.cwd();
const DefaultExtension = '.test.js';
const DefaultSpecDirName = 'spec'


function createResolveUitPath( { specFileExtension = DefaultExtension, specDirName = DefaultSpecDirName } = {} ){

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

    const indexOfSpecDirName
      = relativeToRoot.search( `(/|^)?${specDirName}(/|$)`)

    const replRegex = relativeToRoot[indexOfSpecDirName] == '/'
      ? `/${specDirName}(/|$)`
      : `${specDirName}(/|$)`; 

    const end
      = specDirName.length + 1;

    const uitDirname
      = relativeToRoot.replace( new RegExp( replRegex ), '')

    return path.join( rootRelativeToSpec, uitDirname, `${ basename }.js` );

  }

  return resolveUitPath;

}

module.exports                  = createResolveUitPath;
module.exports.DefaultExtension = DefaultExtension
module.exports.DefaultSpecDirName = DefaultSpecDirName