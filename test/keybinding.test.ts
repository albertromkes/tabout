import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

suite('Keybinding Guards Tests', () => {
    test('activation events avoid wildcard startup activation', () => {
        const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        const activationEvents = packageJson.activationEvents as string[];
        assert.ok(Array.isArray(activationEvents), 'activationEvents should be an array');
        assert.equal(activationEvents.indexOf('*'), -1, 'activationEvents should not use wildcard activation');
        assert.ok(activationEvents.indexOf('onCommand:tabout') > -1, 'tabout command should activate extension');
        assert.ok(activationEvents.indexOf('onCommand:toggle-tabout') > -1, 'toggle command should activate extension');
    });

    test('tabout keybinding includes selection and suggestion safety guards', () => {
        const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        const keybinding = packageJson.contributes.keybindings.find((k: any) => k.command === 'tabout');
        assert.ok(keybinding, 'tabout keybinding should exist');

        const when = keybinding.when as string;
        assert.ok(when.includes('!editorHasSelection'), 'should skip TabOut when there is a text selection');
        assert.ok(when.includes('!editorHasMultipleSelections'), 'should skip TabOut with multiple selections');
        assert.ok(when.includes('!suggestWidgetVisible'), 'should skip TabOut while suggest widget is visible');
        assert.ok(when.includes('!inlineSuggestionVisible'), 'should skip TabOut while inline suggestion is visible');
        assert.ok(when.includes('!inlineEditIsVisible'), 'should skip TabOut while inline edit is visible');
    });

    test('shift+tab reverse keybinding can be disabled via config and is rebindable', () => {
        const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        const reverseBinding = packageJson.contributes.keybindings.find((k: any) => k.command === 'tabout-reverse');
        assert.ok(reverseBinding, 'tabout-reverse keybinding should exist');
        assert.equal(reverseBinding.key, 'shift+tab');
        assert.ok((reverseBinding.when as string).indexOf('config.tabout.enableReverseShiftTab') > -1,
            'reverse binding should be disable-able via setting');

        const enableReverseSetting = packageJson.contributes.configuration.properties['tabout.enableReverseShiftTab'];
        assert.ok(enableReverseSetting, 'tabout.enableReverseShiftTab setting should exist');
        assert.equal(enableReverseSetting.default, true);

        const commands = packageJson.contributes.commands.map((c: any) => c.command);
        assert.equal(commands.indexOf('tabout-reverse'), -1, 'tabout-reverse should not be shown as a separate command');
        assert.ok(commands.indexOf('toggle-tabout-reverse-shift-tab') > -1,
            'toggle command for reverse Shift+Tab setting should exist');
    });
});
