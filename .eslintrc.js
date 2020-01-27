module.exports = {
	"extends": [
		"airbnb-base"
	],
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"globals": {
		"console": true
	},
	"parser": "babel-eslint",
	// "parserOptions": {
	// 	"ecmaVersion": "2018",
	// 	"ecmaFeatures": {
	// 		"jsx": true
	// 	},
	// 	"sourceType": "module",
	// 	"extraFileExtensions": [
	// 		".ts"
	// 	]
	// },
	"rules": {
		"no-const-assign": "warn",
		"no-this-before-super": "warn",
		"no-undef": "warn",
		"no-unreachable": "warn",
		"no-unused-vars": "warn",
		"constructor-super": "warn",
		"valid-typeof": "warn",
		"no-empty-function": 0,
		// "class-methods-use-this": "warn",
		"class-methods-use-this": 0,
		"import/prefer-default-export": 0,
		"import/no-nodejs-modules": 0,
		"import/no-mutable-exports": 0,
		"prefer-arrow-callback": 0,
		"no-else-return": 0,
		"no-debugger": 0,
		"no-console": "error",
		"operator-assignment": 0,
		"prefer-const": "warn",
		"no-invalid-this": 0,
		"no-unused-vars": 0,
		"no-useless-constructor": 0,
		"eol-last": 0,
		"no-underscore-dangle": 0,
		"no-restricted-syntax": 0,
		"arrow-parens": 0,
		"lines-between-class-members": 0,
		"no-multi-assign": 0,
		"comma-dangle": 0,
		"object-curly-newline": 0
	}
};