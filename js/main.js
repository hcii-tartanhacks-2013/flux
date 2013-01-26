(function(){



  $(document).ready(function(){
    //after DOM has been initialized

    $('input#typer').on('keydown', function(event){
      if (event.keyCode === 32) {
        var content = $(this).val();

        var words = content.split(' ');
        var lastWord = words.pop();
        console.log(lastWord);
        var newItem = $('<li>'+ lastWord +'</li>');
        $('ul#words').append(newItem);
        $(this).val('');
      }
    });

    $('body').on('click', function(e){
      $('input#typer').focus();
    });

    var upgrade = function(){
      console.log('Your browser does not currently support Speech Input.');
    };

    (function(){
      var create_email = false;
      var final_transcript = '';
      var recognizing = true;
      var ignore_onend;
      var start_timestamp;


      if (!('webkitSpeechRecognition' in window)) {
        upgrade();
      } else {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() { console.log('onStart'); };
        recognition.onresult = function(event) {
          console.log('onResult') ;
          var interim_transcript = '';
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }
          final_transcript = capitalize(final_transcript);
          final_span.innerHTML = linebreak(final_transcript);
          interim_span.innerHTML = linebreak(interim_transcript);
          if (final_transcript || interim_transcript) {
            showButtons('inline-block');
          }

        };
        recognition.onerror = function(event) { console.log('onError'); };
        recognition.onend = function() {
        recognizing = false;
          if (ignore_onend) {
            return;
          }
          start_img.src = 'mic.gif';
          if (!final_transcript) {
            showInfo('info_start');
            return;
          }
          showInfo('');
          if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
          }
          if (create_email) {
            create_email = false;
            createEmail();
          }
        };
      }

      var  showInfo = function (s) {
      };

      var startButton = function(event) {
        final_transcript = '';
        //recognition.lang = select_dialect.value;
        recognition.start();
        ignore_onend = false;
        //final_span.innerHTML = '';
        //interim_span.innerHTML = '';
        //start_img.src = 'mic-slash.gif';
        showInfo('info_allow');
        //showButtons('none');
        start_timestamp = new Date();
      };



    })();

  });

})();