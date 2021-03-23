let assert = require('chai').assert;

let SettingsParser = require('../../js/settings/settings-parser.js');

let settingsSchemaBoolean = {
    skillTeaching: {
        type: 'boolean',
        title: 'Skill Teaching'
    }
};

let settingBoolean = {
    skillTeaching: true
};

let settingsSchemaString = {
    hintingStrategy: {
        "type": "string",
        "enum": ["full", "partial", "another"],
        "title": "Hinting Strategy",
        "description": "Please pick a hinting strategy"
    }
};

let settingString = {
    hintingStrategy: "full"
};

let settingsSchemaNumber = {
    euclideanPrefillingDistance: {
        type: "number",
        title: "Prefilling: Euclidian Prefilling Distance",
        decimals: 2,
        maximum: 10.5,
        minimum: 1.0
    }
};

let settingNumber = {
    euclideanPrefillingDistance: 4.5
};

let settingsSchemaInteger = {
    startLevel: {
        type: "integer",
        title: "Id of start level",
        maximum: 5,
        minimum: 3
    }
};

let settingInteger = {
    startLevel: 4
};

let settingsSchemaMixed = {
    skillTeaching: {
        type: 'boolean',
        title: 'Skill Teaching'
    },
    startLevel: {
        type: "integer",
        title: "Id of start level",
        maximum: 5,
        minimum: 3
    },
    euclideanPrefillingDistance: {
        type: "number",
        title: "Prefilling: Euclidian Prefilling Distance",
        decimals: 2,
        maximum: 10.5,
        minimum: 1.0
    },
    hintingStrategy: {
        "type": "string",
        "enum": ["full", "partial", "another"],
        "title": "Hinting Strategy",
        "description": "Please pick a hinting strategy"
    }
};

let settingsMixed = {
    skillTeaching: true,
    startLevel: 5,
    euclideanPrefillingDistance: 3.66,
    hintingStrategy: "another"
};

describe('SettingsParser.parseSettingsFromSeed(schema, values)', function() {

    it('should generate settings from schema which contains entry of type boolean', function () {
        assert.deepEqual(SettingsParser.parseSettingsFromSeed(settingsSchemaBoolean, "1"), settingBoolean);
    });

    it('should generate settings from schema which contains string entry', function () {
        assert.deepEqual(SettingsParser.parseSettingsFromSeed(settingsSchemaString, "0"), settingString);
    });

    it('should generate settings from schema which contains number entry', function () {
        assert.deepEqual(SettingsParser.parseSettingsFromSeed(settingsSchemaNumber, "350"), settingNumber);
    });

    it('should generate settings from schema which contains integer entry', function () {
        assert.deepEqual(SettingsParser.parseSettingsFromSeed(settingsSchemaInteger, "1"), settingInteger);
    });

    it('should generate settings from schema that combines several types', function () {
        assert.deepEqual(SettingsParser.parseSettingsFromSeed(settingsSchemaMixed, "122662"), settingsMixed);
    });
});
