$( document ).ready( () => {
  let posts = [];

  $.ajax( 'https://run.mocky.io/v3/73bc4037-1499-47ec-8bf5-84770d049abc' )
    .done( ( data ) => {
      console.log( 'posts', data.posts );
      posts = data.posts;
      renderPosts( posts );
    } );


  /**
   * Realiza la busqueda solo al presionar el botón
   */
  $( '#btn-search' ).on( 'click', () => {
    console.log( 'posts', posts );
    doSearch();
  } );

  /**
   * Al presionar una tecla realiza la busqueda en tiempo real
   */
  $( '#search' ).on( 'keyup', () => {
    console.log( 'posts', posts );
    doSearch();
  } );


  const renderPosts = ( posts ) => {
    let postsHTML = '';

    posts.forEach( ( post, index ) => {
      let commentsHTML = '';

      post.comments.forEach( ( comment ) => {

        let ratingsHTML = '<ul>';

        comment.ratings.forEach( ( rating ) => {
          ratingsHTML += `<li>${ rating.value } - ${ rating.user.user_name }</li>`;
        } );
        ratingsHTML += '</ul>';

        commentsHTML += `
          <div class='media mb-3'>
            <img src='${ comment.user.avatar }' class='mr-3 rounded-circle' width='50' height='50' alt='${ comment.user.user_name }'>
            <div class='media-body'>
              ${ comment.comment }
            </div>

            ${ ratingsHTML }
          </div>
          `;
      } );

      postsHTML += `
          <div class='card mb-5' style='width: 30rem;'>
            <img src='${ post.hero }' class='card-img-top' alt='${ post.title }'>
            <div class='card-body'>
              <h5 class='card-title'>${ post.title }</h5>
              <p class='card-text'>${ post.message }</p>
              <a class='btn btn-primary' data-toggle='collapse' href='#collapseComments${ index }' role='button' aria-expanded='false' aria-controls='collapseComments${ index }'>
              Ver comentarios
              </a>
            </div>
            <div class='collapse' id='collapseComments${ index }'>
            <div class='card card-body'>
                  ${ commentsHTML }
            </div>
          </div>
          </div>`;
    } );

    $( '#posts' ).html( postsHTML );

  };


  const doSearch = () => {
    const searchValue = $( '#search' ).val();
    console.log( 'searchValue', searchValue );
    if( searchValue !== '' ) {

      const filteredPosts = posts.filter( ( post ) => {
        return post.comments.some( ( comment ) => {
          return comment.ratings.some( ( rating ) => {
            return rating.value === parseInt( searchValue );
          } );
        } );
      } );

      // const filteredPosts = posts.filter( ( post ) => {
      //   return post.title.toLowerCase() === searchValue.toLowerCase();
      // } );


      console.log( 'filteredPosts', filteredPosts );

      renderPosts( filteredPosts );
    } else {
      renderPosts( posts );
    }
  };
} );
