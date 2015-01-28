var spawn = require('child_process').spawn,
    EventEmitter = require('events').EventEmitter,
    extract = require('extract-zip');

module.exports = function(options){
  return new EbookConvert(options);
};

function EbookConvert(options){
  // file source
  this.source = options.source;
  this.target = options.target;
  // extracted target
  this.targetex = options.targetex;

  var arguments = [this.source, this.target];

  if (options.arguments){
    for (var i=0; i<options.arguments.length; i++){
      arguments = arguments.concat(options.arguments[i]);
    }
  }

  var targetType = this.target.split(".").pop();
  
  if (targetType === 'pdf'){

  }

  var ee = new EventEmitter;
  var convert = spawn('ebook-convert', arguments);

  convert.stdout.on('data', function(data){
    ee.emit('data', data);
  });

  convert.stdout.on('error', function(err){
    ee.emit('error', err);
  });

  convert.on('message', function(res){
    ee.emit('message', res);
  });

  convert.on('disconnect', function(res){
    ee.emit('disconnect', res);
  });

  convert.on('exit', function(res){
    ee.emit('exit', res);
  });

  convert.on('close', function(code){
    // run extract
    // extract contents of epub
    extract(options.target, {dir: options.targetex}, function(err){
      if (err) { err }
      // extract has occured
      console.log('epub extracted');
      ee.emit('close', code);
    });
  });

  return ee;
};