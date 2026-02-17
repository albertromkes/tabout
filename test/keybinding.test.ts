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

    test('phase 3 commands are contributed for force-tab and reverse navigation', () => {
        const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        const commands = packageJson.contributes.commands.map((c: any) => c.command);
        assert.ok(commands.indexOf('tabout-force-tab') > -1, 'should contribute tabout-force-tab command');
        assert.ok(commands.indexOf('tabout-reverse') > -1, 'should contribute tabout-reverse command');
    });
});
