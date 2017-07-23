  /**
  * To use this, just load the index.html in the browser.
  * It will run through the fake UI in a loop.
  */
  
const root = 'https://jsonplaceholder.typicode.com'
const possibleComments = [
  {body: "Great Post!"},
  {body: "I don't know latin :("},
  {body: "Worst post ever"}
]
const init = () => {
    /**
    * When invoked, this function will get all the users,
    * and then work through the user flow.
    * It uses a delay function to imitate user decision time.
    */
  displayController.getUsers()
    .then((userList) => displayController.showUserList(userList))
    .then((userList) => delay(() => userController.pickUser(userList), 2000))
    // .then( (user) => console.log('user: ', user))
    .then((user) => delay(() => displayController.showUserProfile(user), 1000))
    .then((user) => delay(() => displayController.showLastFivePosts(user), 100))
    .then((lastFive) => delay( () => userController.pickPost(lastFive), 1500))
    .then((post) => delay( () => displayController.showPickedPost(post), 1000))
    .then(() => delay(() => userController.makeComment(possibleComments), 3000))
    .then(() => delay(() => init(), 6000))
    .catch((err) => console.log(err))
}

const delay = (fn, delay) => new Promise((resolve, reject) => {
  /**
  * Delay allows a funtion to be run in the future as a promise
  * @async
  * @param {Function} fn The function to be run
  * @param {Number} delay The number of milliseconds to delay
  */
  setTimeout(() => {
    resolve(fn())
  }, delay)
})

const userController = {
  pickUser: (userList) => {
    /**
    * Picks a user from a list of users and logs the result
    * @param {Array} userList An array of user objects
    * @returns {Object} The user object
    */
    const userId = Math.round(Math.random() * (userList.length - 1))
    console.log('userId', userId)
    console.log(`Picking user #${userId + 1}, ${userList[userId].username}`)
    return userList[userId]
  },
  pickPost: (postList) => {
    /**
    * Picks a post from a list of posts and logs the result
    * @param {Array} postList An array of post objects
    * @returns {Object} The post object
    */
    console.log('Picking post...')
    const postId = Math.round(Math.random() * (postList.length -1))
    console.log(`Post #${postId +1} picked`)
    return postList[postId]
  },
  makeComment: (comments) => {
    /**
    * Picks a comment from a list of comments and logs the result
    * @param {Array} comments An array of comment objects
    */
    const comment = comments[Math.round(Math.random() * (comments.length - 1))]
    console.log(`You commented: '${comment.body}'`)
  }
}

const displayController = {
  getUsers: () => {
    /**
    * Fetches all of the users and parses the json
    * @async
    * @returns {Array} The list of users
    */
    return fetch(`${root}/users`)
      .then((response) => response.json())
  },
  showUserList: (userList) => {
    /**
    * Displays the list of users
    * @param {Array} userList An array of user objects
    * @returns {Array} The list of users
    */
    console.log("Displaying Users:")
    userList.forEach(user => console.log(user.username))
    return userList
  },
  showUserProfile: (user) => {
    /**
    * Takes the user id, fetches their posts, albums, and todos. Displays the results
    * @async
    * @param {Object} user A user object
    * @returns {Array} The list of that user's posts
    */
    return Promise.all([getPostsById(user.id), getAlbumsById(user.id), getTodosById(user.id) ])
      .then((values) => {
        console.log(`${user.username} has ${values[0].length} posts, ${values[1].length} albums, and ${values[2].length} todos`)
        return values[0]
      })
  },
  showLastFivePosts: (userPosts) => {
    /**
    * Displays the the five most current posts from a user
    * @param {Array} userPosts An array of posts for a specific user
    * @returns {Array} The truncated list of posts
    */
    const lastFive = userPosts.length < 5 ?
      userPosts :
      userPosts.slice(userPosts.length - 5)
    console.log('Last five(5) posts: ')
    lastFive.forEach((post, i) => {
      console.log(`Post ${i+1}: ${post.title}`)
    })
    return lastFive
  },
  showPickedPost: (post) => {
    /**
    * Display a single post title and number of comments
    * @param {Object} post A post object
    */
    getComments(post.id)
      .then((comments) => {
        console.log(`Viewing post '${post.title}' which has ${comments.length} comments`)
        return
      })
  }
}

const getPostsById = (id) => {
    /**
    * Takes the user id, fetches their posts
    * @async
    * @param {String} id A user id
    * @returns {Array} The list of that user's posts
    */
  return fetch(`${root}/posts?userId=${id}`)
          .then((response) => response.json())
}
const getAlbumsById = (id) => {
    /**
    * Takes the user id, fetches their albums
    * @async
    * @param {String} id A user id
    * @returns {Array} The list of that user's albums
    */
  return fetch(`${root}/albums?userId=${id}`)
          .then((response) => response.json())
}
const getTodosById = (id) => {
    /**
    * Takes the user id, fetches their todos
    * @async
    * @param {String} id A user id
    * @returns {Array} The list of that user's todos
    */
  return fetch(`${root}/todos?userId=${id}`)
          .then((response) => response.json())
}
const getComments = (id) => {
    /**
    * Takes the post id, fetches its comments
    * @async
    * @param {String} user A post id
    * @returns {Array} The list of that post's comments
    */
  return fetch(`${root}/comments?postId=${id}`)
          .then((response) => response.json())
}

init()