# Resolve UIT Path

TL;DR

:point_right: :scream: Node Native:

```js
const unitInTest = require( '../../../../../../../../lib/path/back/to/the/module/with/the/unitInTest')
```

:point_right: :relieved: Babel Namespaces:

```js
const unitInTest = require( '<lib>/path/back/to/the/module/with/the/unitInTest')
```

:point_right: :smiley: This here module:

```js
const unitInTest = require( resolveUitPath( __filename ) )
```

## Usage

If you define your test files within a spec or test folder at a path that matches your unit in test, you can use this module to get the path to the module to be tested.

For example, if your folder structure looked like this:

```bash
project/
├── lib
│   └── path
│       └── back
│           └── to
│               └── the
│                   └── module
│                       └── with
│                           └── the
│                               └── unitInTest
│                                   └── index.js
└── spec
    └── lib
        └── path
            └── back
                └── to
                    └── the
                        └── module
                            └── with
                                └── the
                                    └── unitInTest
                                        └── index.test.js
```

you would do something like this with relative paths:

```js
const unitInTest = require( '../../../../../../../../lib/path/back/to/the/module/with/the/unitInTest')
```

or something like this with Babel Namespaces:

```js
const unitInTest = require( '<lib>/path/back/to/the/module/with/the/unitInTest')
```

This might be fine once or twice, but the more you deal with highly modular code, the more tedious this gets.

Using this little library, you can do this instead in your test file

```js
// file: spec/lib/path/back/to/the/module/with/the/unitInTest/index.test.js

const resolveUitPath = require( 'resolve-uit-path' )();
const uitPath = resolveUitPath( __filename );

describe( `The ${ uitPath } function`, ()=>{

  it( 'should throw if called without arguments', ()=>{

    const uit = require( uitPath );
    expect( uit ).to.throw();

  });

} );
```

### Configuration

The module allows you to configure, which type of extension you want to use for your test files. It defaults to `.test.js`, but you can change that by instantiating it with an alternative `specFileExtension`.

For example, if you used the `-spec.js` extension instead of `.test.js`, you would configure the module as shown below:

```js

// file: spec/lib/path/back/to/the/module/with/the/unitInTest/index-spec.js

const resolveUitPath = require( 'resolve-uit-path' )( { specFileExtension: '-spec.js'});
const uitPath = resolveUitPath( __filename );

describe( `The ${ uitPath } function`, ()=>{

  it( 'should throw if called without arguments', ()=>{

    const uit = require( uitPath );
    expect( uit ).to.throw();

  });

} );
```
### Root Folder

The library assumes that the level-difference between the spec and the uit is 1, meaning that you can store your test in `spec`, `tests`, `specFiles`, etc, but within the spec folder, the path must match.

:white_check_mark: will work:

```bash
project/
├── lib
│   └── path
└── spec
    └── lib
        └── path
```

:white_check_mark: will work:

```bash
project/
├── lib
│   └── path
└── tests
    └── lib
        └── path
```

:white_check_mark: will work for both the spec folder and the spec-integration folder

```bash
project/
├── lib
│   └── path
├── spec
│   └── lib
│       └── path
└── spec-integration
    └── lib
        └── path
```

:x: will not work

```bash
project/
├── lib
│   └── path
└── spec
    ├── integration
    │   └── lib
    │       └── path
    └── unit
        └── lib
            └── path
```
