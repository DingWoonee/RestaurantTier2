document.addEventListener('DOMContentLoaded', function () {

    // 게시글 좋아요
    document.getElementById("likeButton").addEventListener('click',
        function (event) {

            var postId = this.dataset.postId;
            fetch("/api/post/like?postId=" + postId, {
                method: 'GET'
            })
                .then(response => {
                    if (response.ok) {
                        if (response.redirected) {
                            window.location.href = "/user/login";
                            return;
                        }
                        return response.json()
                    }
                })
                .then(data => {
                    if (data.dislikeCount === 0) {
                        document.querySelector("#dislikeButton > span").textContent = 0
                    } else {
                        document.querySelector("#dislikeButton > span").textContent = "-" + data.dislikeCount;

                    }
                    document.querySelector("#likeButton > span").textContent = data.likeCount;

                    const likeButtonImage = document.querySelector('#likeButton img');
                    const dislikeButtonImage = document.querySelector('#dislikeButton img');
                    // 버튼 누르기 전 상태에 따라 이미지 설정 다르게 해줌 (좋아요가 이미 눌러져있을때, 싫어요가 눌러져있을때, 둘다 없었을떄)
                    if (data.likeDelete) {
                        likeButtonImage.src = '/img/community/up.png';

                    } else if (data.likeChanged) {
                        likeButtonImage.src = '/img/community/up-green.png';
                        dislikeButtonImage.src = '/img/community/down.png';
                    } else if (data.likeCreated) {
                        likeButtonImage.src = '/img/community/up-green.png';
                    }
                }).catch(error => console.error('Error:', error));

        }
    )

    // 게시글 싫어요
    document.getElementById("dislikeButton").addEventListener('click',
        function (event) {

            event.preventDefault()
            var postId = this.dataset.postId;
            fetch("/api/post/dislike?postId=" + postId, {
                method: 'GET'
            })
                .then(response => {
                    if (response.ok) {
                        if (response.redirected) {
                            window.location.href = "/user/login";
                            return;
                        }
                        return response.json()
                    }
                })
                .then(data => {
                    if (data.dislikeCount === 0) {
                        document.querySelector("#dislikeButton > span").textContent = 0
                    } else {
                        document.querySelector("#dislikeButton > span").textContent = "-" + data.dislikeCount;

                    }
                    document.querySelector("#likeButton > span").textContent = data.likeCount;

                    const likeButtonImage = document.querySelector('#likeButton img');
                    const dislikeButtonImage = document.querySelector('#dislikeButton img');
                    // 버튼 누르기 전 상태에 따라 이미지 설정 다르게 해줌 (싫어요가 이미 눌러져있을때, 좋아요가 눌러져있을때, 둘다 없었을떄)
                    if (data.dislikeDelete) {
                        dislikeButtonImage.src = '/img/community/down.png';

                    } else if (data.dislikeChanged) {
                        likeButtonImage.src = '/img/community/up.png';
                        dislikeButtonImage.src = '/img/community/down-red.png';
                    } else if (data.dislikeCreated) {
                        dislikeButtonImage.src = '/img/community/down-red.png';
                    }
                }).catch(error => console.error('Error:', error));
        }
    )

    //게시글 스크랩 버튼 리스너
    document.getElementById("scrap").addEventListener('click',

        function (event) {
            event.preventDefault()
            var postId = this.dataset.postId;
            fetch("/api/post/scrap?postId=" + postId, {
                method: 'GET'
            })
                .then(response => {
                    if (response.ok) {
                        if (response.redirected) {
                            window.location.href = "/user/login";
                            return;
                        }
                        return response.json()
                    }
                })
                .then(data => {
                    const scrapImage = document.querySelector('#scrap img');
                    // 스크랩 되어있던 거 였으면 일반 이미지로 변환
                    if (data.scrapDelete) {
                        scrapImage.src = '/img/community/scrap.png';

                    }
                    // 스크랩 안되어 있었으면 녹색 스크랩 이미지로 변환
                    else if (data.scrapCreated) {
                        scrapImage.src = '/img/community/scrap-green.png';
                    }
                }).catch(error => console.error('Error:', error));

        }
    )

    // 댓글 좋아요 버튼 리스너
    document.querySelectorAll('.comment-up').forEach(button => {

        button.addEventListener('click', function (event) {
            event.preventDefault()

            const commentId = this.getAttribute('data-id'); // data-id 속성에서 댓글 ID 가져오기
            fetch(`/api/comment/like/${commentId}`, { // 서버에 GET 요청 보내기
                method: 'GET'
            })
                .then(response => {
                    if (response.ok) {
                        if (response.redirected) {
                            window.location.href = "/user/login";
                            return;
                        }
                        return response.json()
                    }
                })
                .then(data => {

                    this.parentNode.querySelector(".totalLikeCount").textContent = data.totalLikeCount

                    const likeButtonImage = this.querySelector('img');
                    const dislikeButtonImage = this.parentNode.querySelector('.comment-down img');

                    // 버튼 누르기 전 상태에 따라 이미지 설정 다르게 해줌 (싫어요가 이미 눌러져있을때, 좋아요가 눌러져있을때, 둘다 없었을떄)
                    if (data.likeDelete) {
                        likeButtonImage.src = '/img/community/up.png';

                    } else if (data.changeToLike) {
                        likeButtonImage.src = '/img/community/up-green.png';
                        dislikeButtonImage.src = '/img/community/down.png';
                    } else if (data.likeCreated) {
                        likeButtonImage.src = '/img/community/up-green.png';
                    }
                }).catch(error => console.error('Error:', error));
        });
    });

    // 댓글 싫어요 버튼 리스너
    document.querySelectorAll('.comment-down').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault()
            const commentId = this.getAttribute('data-id');
            fetch(`/api/comment/dislike/${commentId}`, {
                method: 'GET'
            })
                .then(response => {
                    if (response.ok) {
                        if (response.redirected) {
                            window.location.href = "/user/login";
                            return;
                        }
                        return response.json()
                    }
                })
                .then(data => {
                    this.parentNode.querySelector(".totalLikeCount").textContent = data.totalLikeCount

                    const dislikeButtonImage = this.querySelector('img');
                    const likeButtonImage = this.parentNode.querySelector('.comment-up img');
                    // 버튼 누르기 전 상태에 따라 이미지 설정 다르게 해줌 (싫어요가 이미 눌러져있을때, 좋아요가 눌러져있을때, 둘다 없었을떄)
                    if (data.dislikeDelete) {
                        dislikeButtonImage.src = '/img/community/down.png';

                    } else if (data.changeToDislike) {
                        likeButtonImage.src = '/img/community/up.png';
                        dislikeButtonImage.src = '/img/community/down-red.png';
                    } else if (data.dislikeCreated) {
                        dislikeButtonImage.src = '/img/community/down-red.png';
                    }
                }).catch(error => console.error('Error:', error));
        });
    });
    // 대댓글 달기 버튼 리스너
    document.querySelectorAll('.reply').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault()
            // 현재 페이지의 모든 댓글 작성 창을 찾습니다.
            var allForms = document.querySelectorAll('.comment-ul .comment-write');
            var existingForm = null;

            // 현재 버튼이 속한 댓글 요소를 찾습니다.
            var parentComment = this.closest('.comment-li');

            // 페이지 내의 모든 댓글 작성 창을 순회하면서 현재 댓글의 바로 다음 요소인지 확인합니다.
            allForms.forEach(function (form) {
                if (parentComment.nextSibling === form) {
                    existingForm = form;
                }
            });

            // 만약 해당 댓글 작성 창이 이미 존재하고, 그것이 현재 댓글의 바로 다음 요소라면, 그것을 제거합니다.
            if (existingForm) {
                existingForm.remove();
                return; // 함수 실행을 여기서 중단합니다.
            } else {
                // 기존에 열려있는 댓글 작성 창을 모두 제거합니다.
                allForms.forEach(function (form) {
                    form.remove();
                });


                // 새로운 댓글 작성 창을 생성하고 삽입합니다.
                var commentWriteForm = document.querySelector('.comment-write').cloneNode(true);

                var parentCommentId = this.closest('.comment-li').getAttribute('data-id');

                // 폼에 data-comment-id 속성 추가
                commentWriteForm.setAttribute('data-comment-id', parentCommentId);

                parentComment.parentNode.insertBefore(commentWriteForm, parentComment.nextSibling);
                commentWriteForm.querySelector('textarea').focus();
            }


        });


    });
    // 댓글 작성
    document.querySelector('.post-footer .comment-form').addEventListener('submit', function (event) {
        event.preventDefault(); // 폼의 기본 제출 동작을 방지
        // 현재 주소에서 postId 추출

        var postId = window.location.pathname.split('/').pop();
        console.log(postId)
        var formData = new FormData(this);
        formData.append('postId', postId);

        fetch(this.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    if (response.redirected) {
                        window.location.href = "/user/login";
                    } else {
                        window.location.reload();

                    }


                }
            })
            .catch(error => {
                alert(error.message)
                console.error('Error:', error);
            });
    });
    // 대댓글 작성 완료 버튼 리스너
    document.querySelector('.comment-ul').addEventListener('submit', function (event) {
        event.preventDefault(); // 폼의 기본 제출 동작을 방지
        if (!event.target.matches(" .comment-form")) {
            return
        }
        // 현재 주소에서 postId 추출
        var postId = window.location.pathname.split('/').pop();
        var form = document.querySelector(".comment-ul .comment-form")
        var formData = new FormData(form);
        formData.append('postId', postId);

        // 폼에서 data-comment-id 속성 값을 가져와서 formData에 추가
        var parentCommentId = document.querySelector('.comment-ul .comment-write').getAttribute('data-comment-id');
        if (parentCommentId) {
            formData.append('parentCommentId', parentCommentId); // 대댓글이 속한 댓글의 ID를 formData에 추가
        }


        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    if (response.redirected) {
                        window.location.href = "/user/login";
                    } else {
                        window.location.reload();
                    }
                }
            })
            .catch(error => {
                alert(error.message)
                console.error('Error:', error);
            });
    });


})