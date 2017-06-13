'use strict';

const TestCase = require('./TestCase');
const PugInheritance = require('../src');

class PugInheritanceTest extends TestCase {
  setUp() {
    this.pugInheritance = new PugInheritance('tests/fixtures/**/*.pug');
  }

  testSingleFile() {
    this.assertEquals(
      ['tests/fixtures/test-1.pug'],
      this.pugInheritance.getInheritance('tests/fixtures/test-1.pug')
    );
  }

  testEditInheritance() {
    this.assertEquals(
      ['tests/fixtures/test-2-2.pug'],
      this.pugInheritance.getInheritance('tests/fixtures/test-2-2.pug')
    );
  }

  testEditLayout() {
    this.assertEquals(
      ['tests/fixtures/test-3-1.pug', 'tests/fixtures/test-3-2.pug', 'tests/fixtures/test-3-3.pug'],
      this.pugInheritance.getInheritance('tests/fixtures/test-3-1.pug')
    );
  }

  testEditIncluded() {
    this.assertEquals(
      ['tests/fixtures/test-4-3.pug', 'tests/fixtures/test-4-2.pug'],
      this.pugInheritance.getInheritance('tests/fixtures/test-4-3.pug')
    );
  }

  testNested() {
    this.assertEquals(
      ['tests/fixtures/test-5/test-5-1.pug', 'tests/fixtures/test-5-2.pug'],
      this.pugInheritance.getInheritance('tests/fixtures/test-5/test-5-1.pug')
    );
  }

  testPatternNormalize() {
    this.assertEquals(
      new PugInheritance('tests/fixtures/**/*.pug').getInheritance('tests/fixtures/test-5/test-5-1.pug'),
      new PugInheritance('./tests/fixtures/**/*.pug').getInheritance('./tests/fixtures/test-5/test-5-1.pug')
    );
  }
}

module.exports = PugInheritanceTest;
