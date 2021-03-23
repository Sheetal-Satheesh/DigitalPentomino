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
        maximum: 10.0,
        minimum: 0.0
    }
};

let settingNumber = {
    euclideanPrefillingDistance: 4.0
}

let settingsSchemaInteger = {
    startLevel: {
        type: "integer",
        title: "Id of start level",
        maximum: 5,
        minimum: 3
    }
}

let settingInteger = {
    startLevel: 4
}

describe('SettingsParser.parseSettingsToSeed(schema, values)', function() {

    it('should parse schema which contains entry of type boolean', function () {
        assert.strictEqual(SettingsParser.parseSettingsToSeed(settingsSchemaBoolean, settingBoolean), "1");
    });

    it('should parse schema which contains string entry', function () {
        assert.strictEqual(SettingsParser.parseSettingsToSeed(settingsSchemaString, settingString), "0");
    });

    it('should parse schema which contains number entry', function () {
        assert.strictEqual(SettingsParser.parseSettingsToSeed(settingsSchemaNumber, settingNumber), "400");
    });

    it('should parse schema which contains integer entry', function () {
        assert.strictEqual(SettingsParser.parseSettingsToSeed(settingsSchemaInteger, settingInteger), "1");
    });
});
