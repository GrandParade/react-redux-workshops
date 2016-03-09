var Module = require('module');
var originalRequire = Module.prototype.require;

Module.prototype.require = function (fileName) {
    if (fileName.substr(-5) === '.scss') {
        return '';
    }

    return originalRequire.apply(this, arguments);
};
