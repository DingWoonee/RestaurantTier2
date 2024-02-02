document.addEventListener("DOMContentLoaded", function() {


    const page_elements = document.getElementsByClassName("page-link");
    Array.from(page_elements).forEach(function(element) {
        element.addEventListener('click', function() {
            
            // form의 값을 현재 페이지로 설정하고 전송
            document.getElementById('page').value = this.dataset.page;
            document.getElementById('searchForm').submit();
        });
    });
    const btn_search = document.getElementById("postSearch");
    console.log(btn_search)
    btn_search.addEventListener('click', function() {

        // form의 값을 현재 kw와 현재 page로 설정하고 전송

        document.getElementById('kw').value = document.getElementById('search_kw').value;
        document.getElementById('page').value = 0;  // 검색버튼을 클릭할 경우 0페이지부터 조회한다.
        document.getElementById('searchForm').submit();
    });
});
