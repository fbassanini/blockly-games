/**
 * Blockly Games: Music Graphics Blocks
 *
 * Copyright 2012 Google Inc.
 * https://github.com/google/blockly-games
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Music Graphics application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Music.Blocks');

goog.require('Blockly');
goog.require('Blockly.Blocks.lists');
goog.require('Blockly.Blocks.logic');
goog.require('Blockly.Blocks.loops');
goog.require('Blockly.Blocks.math');
goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.Blocks.variables');
goog.require('Blockly.JavaScript');
goog.require('Blockly.JavaScript.lists');
goog.require('Blockly.JavaScript.logic');
goog.require('Blockly.JavaScript.loops');
goog.require('Blockly.JavaScript.math');
goog.require('Blockly.JavaScript.procedures');
goog.require('Blockly.JavaScript.variables');
goog.require('BlocklyGames');


/**
 * Common HSV hue for all blocks in this category.
 */
Music.Blocks.HUE = 160;

Blockly.Blocks['music_pitch'] = {
  /**
   * Block for pitch.
   * @this Blockly.Block
   */
  init: function() {
    var notes = [
      ['A4', '69'],
      ['G4', '67'],
      ['F4', '65'],
      ['E4', '64'],
      ['D4', '62'],
      ['C4', '60'],
      ['B3', '59'],
      ['A3', '57'],
      ['G3', '55']
    ];
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(notes), 'PITCH');
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setTooltip(BlocklyGames.getMsg('Music_pitchTooltip'));
  }
};

Blockly.JavaScript['music_pitch'] = function(block) {
  return [block.getFieldValue('PITCH'), Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['music_note'] = {
  /**
   * Block for playing note.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('Music_playNote'),
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DURATION",
          "options": [
            ["whole", "1"],
            ["half", "0.5"],
            ["quarter", "0.25"],
            ["eighth", "0.125"],
            ["sixteenth", "0.0625"]
          ]
        },
        {
          "type": "input_value",
          "name": "PITCH",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Music.Blocks.HUE,
      "tooltip": BlocklyGames.getMsg('Music_playNoteTooltip')
    });
  }
};

Blockly.JavaScript['music_note'] = function(block) {
  var pitch = Blockly.JavaScript.valueToCode(block, 'PITCH',
      Blockly.JavaScript.ORDER_COMMA) || '60';
  return 'play(' + block.getFieldValue('DURATION') + ', ' + pitch +
          ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['music_rest'] = {
  /**
   * Block for playing note.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('Music_rest'),
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DURATION",
          "options": [
            ["whole", "1"],
            ["half", "0.5"],
            ["quarter", "0.25"],
            ["eighth", "0.125"],
            ["sixteenth", "0.0625"]
          ]
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Music.Blocks.HUE,
      "tooltip": BlocklyGames.getMsg('Music_restTooltip')
   });
  }
}
Blockly.JavaScript['music_rest'] = function(block) {
  return 'rest(' + block.getFieldValue('DURATION') +
      ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['music_instrument'] = {
  /**
   * Block for playing note.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('Music_setInstrument'),
      "args0": [
        {
          "type": "field_dropdown",
          "name": "INSTRUMENT",
          "options": [
            [BlocklyGames.getMsg('Music_piano'), "piano"],
            [BlocklyGames.getMsg('Music_trumpet'), "trumpet"],
            [BlocklyGames.getMsg('Music_banjo'), "banjo"],
            [BlocklyGames.getMsg('Music_violin'), "violin"],
            [BlocklyGames.getMsg('Music_guitar'), "guitar"],
            [BlocklyGames.getMsg('Music_flute'), "flute"],
            [BlocklyGames.getMsg('Music_drum'), "drum"],
            [BlocklyGames.getMsg('Music_choir'), "choir"]
          ]
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Music.Blocks.HUE,
      "tooltip": BlocklyGames.getMsg('Music_setInstrumentTooltip')
    });
  }
};

Blockly.JavaScript['music_instrument'] = function(block) {
  return 'setInstrument(\'' + block.getFieldValue('INSTRUMENT')  +
          '\', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['music_start'] = {
  /**
   * Block for playing note.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('Music_start'),
      "args0": [
        {
          "type": "field_image",
          "src": "music/play.png",
          "width": 17,
          "height": 17,
          "alt": "▶"
        }
      ],
      "message1": "%1",
      "args1": [
        {
          "type": "input_statement",
          "name": "STACK"
        }
      ],
      "colour": 0,
      "tooltip": BlocklyGames.getMsg('Music_startTooltip')
    });
  }
};

Blockly.JavaScript['music_start'] = function(block) {
  Music.startCount++;
  var statements_stack = Blockly.JavaScript.statementToCode(block, 'STACK');
  return 'function start' + Music.startCount + '() {\n' +
      statements_stack + '}\n';
};

if (BlocklyGames.LEVEL < 10) {
  /**
   * Block for defining a procedure with no return value.
   * Remove comment and mutator.
   * @this Blockly.Block
   */
  Blockly.Blocks['procedures_defnoreturn'].init = function() {
    var nameField = new Blockly.FieldTextInput(
        Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    this.setColour(Blockly.Blocks.procedures.HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
    this.arguments_ = [];
    this.setStatements_(true);
  };

  delete Blockly.Blocks['procedures_defreturn'];
  delete Blockly.Blocks['procedures_ifreturn'];
};
