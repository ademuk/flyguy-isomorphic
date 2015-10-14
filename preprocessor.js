/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var babel = require('babel-core');

module.exports = {
  process: function(src, filename) {
    if (!babel.canCompile(filename)) {
      return '';
    }
    if (filename.indexOf('node_modules') === -1) {
      return babel.transform(src, {
        filename: filename
      }).code;
    }
    return src;
  }
};
