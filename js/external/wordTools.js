var wordTools = (function(){

    function countSyllables(word) {
        word = word.toLowerCase();
        //word.downcase!
        if (word.length <= 3) {
          return 1;
        }//return 1 if word.length <= 3
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
        word = word.replace(/^y/, '');
        //word.sub!(/^y/, '')
        return word.match(/[aeiouy]{1,2}/g).length;
        //word.scan(/[aeiouy]{1,2}/).size
      }

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
      return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;
    function capitalize(s) {
      return s.replace(first_char, function(m) { return m.toUpperCase(); });
    }


    return {
        countSyllables: countSyllables,
        linebreak: linebreak,
        capitalize: capitalize
    }


})();

