var fs = require('fs');
var path = require('path');
var Q = require('q');
var Config = require('../config/config'),
    conf = new Config();
const NodeCache = require("node-cache");

var _this = this;
var EMAIL_CACHE = new NodeCache();
const DIR_EMAIL = conf.email_dir_templates;

module.exports.init = function() {
    try {
        console.log('====================================');
        console.log('Init CACHE Email template...');
        console.log('====================================');
        var listfile = fs.readdirSync(DIR_EMAIL);
        if (listfile && listfile.length > 0) {
            for (var i in listfile) {
                var filename = listfile[i];
                var content = fs.readFileSync(path.resolve(DIR_EMAIL, filename), 'utf-8');
                if (content && content.length > 0) {
                    EMAIL_CACHE.set(filename, content);
                }
            }
        }
    } catch (e) {
        console.error('Error init:', e.stack);
    }
}

module.exports.getContentFile = function(filename) {
    var deferred = Q.defer();
    try {
        fs.readFile(path.resolve(DIR_EMAIL, filename), 'utf-8', function(err, content) {
            if (err) {
                console.error(err);
                deferred.reject(err);
            }
            deferred.resolve(content);
        });
    } catch (err) {
        console.error("Error getContentFile: " + err);
        deferred.reject(err);
    }
    return deferred.promise;
}

module.exports.getCacheEmail = function(filename) {
    var deferred = Q.defer();
    try {
        var content = EMAIL_CACHE.get(filename);
        deferred.resolve(content);
    } catch (e) {
        console.error('Error getCacheEmail:', e.stack);
        deferred.reject(e);
    }
    return deferred.promise;
}

module.exports.getCacheEmailSync = function(filename) {
    try {
        var rs = EMAIL_CACHE.get(filename);
        if (rs && rs.length > 0) {
            return rs;
        } else {
            rs = fs.readFileSync(path.resolve(DIR_EMAIL, filename), 'utf-8');
            if (rs && rs.length > 0) {
                EMAIL_CACHE.set(filename, rs);
            }
        }
        return rs;
    } catch (e) {
        console.error('Error getCacheEmailSync:', e.stack);
    }
}

module.exports.getContentEmail = function(filename) {
    var deferred = Q.defer();
    try {
        var content = EMAIL_CACHE.get(filename);
        if (content && content.length > 0) {
            deferred.resolve(content);
        } else {
            _this.getContentFile(filename).then(function(res) {
                deferred.resolve(res);
            });
        }
    } catch (err) {
        console.error("Error getContentFile: " + err);
        deferred.reject(err);
    }
    return deferred.promise;
}

module.exports.getContentEmailSync = function(filename) {
    try {
        var content = fs.readFileSync(path.resolve(DIR_EMAIL, filename), 'utf-8');
        return content;
    } catch (err) {
        console.error("Error getContentEmailSync: " + err);
    }
    return "";
}