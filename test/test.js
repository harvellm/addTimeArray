
var expect = require('chai').expect;
var sut = require('../index');

describe('addTimeArray()', function () {
    it('should add two times', function () {
      let test1Array = ['01:00','01:00'];
      var test1Result= sut(test1Array);
      expect(test1Result.text).to.be.equal('00:02:00');
      expect(test1Result.status).to.be.equal('success');
    });

    it('should add times with hours and without hours', function () {
      let test2Array = ['11:00:01','01:01'];
      var test2Result = sut(test2Array);
      expect(test2Result.text).to.be.equal('11:01:02');
      expect(test2Result.status).to.be.equal('success');
    });

    it('should add multiple times with hours and without hours', function () {
      let test3Array =  ["12:38", "6:36", "9:03", "8:34", "5:02", "6:54", 
      "13:22", "4:41", "8:36", "21:58", "3:06", "10:46", "10:13", "12:54",
      "14:00", "11:03", "16:03", "10:52", "24:53", "10:03", "11:49",
      "15:47", "3:19", "2:06", "5:47", "1:03", "5:29", "5:47", "26:39"];
      var test3Result = sut(test3Array);
      expect(test3Result.text).to.be.equal('04:59:03');
      expect(test3Result.status).to.be.equal('success');
    });

    it('should return error with bad value if string is not valid time', function () {
      let test4Array = ['11:00:01','French Canadian Elephants'];
      var test4Result = sut(test4Array);
      expect(test4Result.status).to.be.equal('error');
      expect(test4Result.text).that.be.equal('French Canadian Elephants');
    });
    
    it('should treat strings without colons and numbers < 59 as seconds', function() {

        let test5array = ['59','01'];
        var test5Result = sut(test5array);
        expect(test5Result.text).to.be.equal('00:01:00');
        expect(test5Result.status).to.be.equal('success');
    });
  });


// console.log(`${totalTime.hours()}:${totalTime.minutes()}:${totalTime.seconds()}`);
