'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const lex = require('pug-lexer');
const walk = require('pug-walk');
const parse = require('pug-parser');

class PugInheritance {
  constructor(pattern) {
    this.pugs = [];

    this.pattern = path.normalize(pattern);

    this.buildRelations();
  }

  buildRelations() {
    glob.sync(this.pattern).forEach(file => {
      this.pugs[file] = {
        extends: [],
        includes: [],
        extendedBy: [],
        includedBy: [],
      };

      try {
        walk(parse(lex(fs.readFileSync(file, 'utf8'))), node => {
          if ('Extends' !== node.type && 'RawInclude' !== node.type) {
            return;
          }

          this.pugs[file][{ Extends: 'extends', RawInclude: 'includes' }[node.type]].push(
            path.join(path.dirname(file), `${node.file.path}.pug`)
          );
        });
      } catch (e) {
        console.error(e);
      }
    });

    for (let file in this.pugs) {
      ['extends', 'includes'].forEach(prop => {
        this.pugs[file][prop].forEach(relation => {
          try {
            this.pugs[relation][{ extends: 'extendedBy', includes: 'includedBy' }[prop]].push(file);
          } catch (e) {
            console.error(`File [${relation}] not found. (${file})`);
          }
        });
      });
    }
  }

  getInheritance(file) {
    let relations = [file = path.normalize(file)];

    ['extendedBy', 'includedBy'].forEach(prop => {
      this.pugs[file][prop].forEach(relation => {
        relations = relations.concat(this.getInheritance(relation));
      });
    });

    return this._getUnique(relations);
  }

  _getUnique(arr) {
    let unique = {};

    arr.forEach(value => {
      unique[value] = value;
    });

    return Object.keys(unique);
  }
}

module.exports = PugInheritance;
