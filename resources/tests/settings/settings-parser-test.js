let assert = require('chai').assert;

let SettingsParser = require('../../js/settings/settings-parser.js');

let settingsSchemaBoolean = {
    skillTeaching: {
        type: 'boolean',
        title: 'Skill Teaching'
    }
};

let settingsSchemaString = {
    hintingStrategy: {
        "title": "Hinting Strategy",
        "description": "Please pick a hinting strategy",
        "type": "string",
        "enum": ["full","partial","another"]
    }
};

let settingsA = {
    skillTeaching: true
};

let settingsB = {
    hintingStrategy: "full"
};

let settingsC = {

}

describe('SettingsParser.parseSettingsToSeed(schema, values)', function() {

    it('should parse schema which contains entry of type boolean', function () {
        assert.strictEqual(SettingsParser.parseSettingsToSeed(settingsSchemaBoolean, settingsA), "1");
    });

    it('should parse schema which contains string entry', function () {
        assert.strictEqual(SettingsParser.parseSettingsToSeed(settingsSchemaString, settingsB), "f");
    });
});
