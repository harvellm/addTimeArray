
let expect = require('chai').expect;
let sut = require('../index');

describe('addTimeArray()', function () {
    it('should add two times', function () {
      let test1Array = ['01:00','01:00'];
      let test1Result= sut(test1Array);
      expect(test1Result.text).to.be.equal('00:00:02:00');
      expect(test1Result.status).to.be.equal('success');
    });

    it('should add times with hours and without hours', function () {
      let test2Array = ['11:00:01','01:01'];
      let test2Result = sut(test2Array);
      expect(test2Result.text).to.be.equal('00:11:01:02');
      expect(test2Result.status).to.be.equal('success');
    });

    it('should add multiple times with hours and without hours', function () {
      let test3Array =  ["12:38", "6:36", "9:03", "8:34", "5:02", "6:54", 
      "13:22", "4:41", "8:36", "21:58", "3:06", "10:46", "10:13", "12:54",
      "14:00", "11:03", "16:03", "10:52", "24:53", "10:03", "11:49",
      "15:47", "3:19", "2:06", "5:47", "1:03", "5:29", "5:47", "26:39"];
      let test3Result = sut(test3Array);
      expect(test3Result.text).to.be.equal('00:04:59:03');
      expect(test3Result.status).to.be.equal('success');
    });

    it('should return error with bad value if string is not valid time', function () {
      let test4Array = ['11:00:01','French Canadian Elephants'];
      let test4Result = sut(test4Array);
      expect(test4Result.status).to.be.equal('error');
      expect(test4Result.text).that.be.equal('French Canadian Elephants');
    });
    
    it('should treat strings without colons and numbers < 59 as seconds', function() {

        let test5Array = ['59','01'];
        let test5Result = sut(test5Array);
        expect(test5Result.text).to.be.equal('00:00:01:00');
        expect(test5Result.status).to.be.equal('success');
    });
    it('should handle hours above 24', function() {
      let test6Array = ['25:00:01','1:00:01'];
      let test6Result = sut(test6Array);
      expect(test6Result.text).to.be.equal('01:02:00:02');
      expect(test6Result.status).to.be.equal('success');
    });
    it('should handle adding days', function () {
      let test6Array = ['01:02:00:01','1:00:01'];
      let test6Result = sut(test6Array);
      expect(test6Result.text).to.be.equal('01:03:00:02');
      expect(test6Result.status).to.be.equal('success');
    });
  });


