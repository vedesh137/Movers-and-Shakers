$(document).ready(function () {
    totalRecords = 0,
    records = [],
    recPerPage = 0,
    nextPageToken = "",
    totalPages = 0;
  var API_KEY = "";
  var search = "";
  var duration = "any";
  var order = "relevance";
  var maxResults=10


  $("#duration").change(function () {
    duration = $(this).children("option:selected").val();
  });
  $("#order").change(function () {
    order = $(this).children("option:selected").val();
  });


    //search = "Popcaan";
  
    //selecting text from element with id myH1
    const myH1 = document.getElementById('myH1');
    search = myH1.textContent;


    API_KEY = "";

    var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}
        &part=snippet&q=${search}&maxResults=${maxResults}&order=${order}&videoDuration=${duration}&type=video`;

    $.ajax({
      method: "GET",
      url: url,
      beforeSend: function () {
        $("#btn").attr("disabled", true);
        $("#results").empty();
      },
      success: function (data) {
        console.log(data);
        $("#btn").attr("disabled", false);
        displayVideos(data);
      },
    });


  $("#search").change(function () {
      search = $("#search").val();
    });

  function displayVideos(data) {
    recPerPage = data.pageInfo.resultsPerPage;
    nextPageToken = data.nextPageToken;
    console.log(records);
    totalRecords = data.pageInfo.totalResults;
    totalPages = Math.ceil(totalRecords / recPerPage);
    // apply_pagination();
    $("#search").val("");

    var videoData = "";

    $("#table").show();


    data.items.forEach((item) => {
      videoData = `
                    
                    <tr>
                    <td>
                    <img width="200" height="200" src="${item.snippet.thumbnails.high.url}"/>
                    </td>
                    <td>
                    <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
                    ${item.snippet.title}
                    </td>
                    <td>
                    <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a>
                    </td>
                    <td>
                    <p id="${item.id.videoId}">${item.id.videoId}</p>
<button onclick="copyToClipboard('#${item.id.videoId}')">Copy</button>
                    </td>
                    </tr>
                    <script>
                      function copyToClipboard(element) {
                        var $temp = $("<input>");
                        $("body").append($temp);
                        $temp.val($(element).text()).select();
                        document.execCommand("copy");
                        $temp.remove();
                      }
                      </script>
                    `;

      $("#results").append(videoData);
    });
  }
});