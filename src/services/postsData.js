// Shared posts data service
const postsData = [
  {
    id: 1,
    title: "Cách học tiếng Nhật hiệu quả cho người mới bắt đầu",
    content: `Mình đang muốn tự học tiếng Nhật từ con số 0. Có ai có kinh nghiệm học tiếng Nhật tự học thành công không ạ? Mình muốn hỏi:

1. Nên bắt đầu từ đâu? Hiragana và Katakana trước hay học từ vựng cơ bản?

2. App nào tốt để học tiếng Nhật? Mình đang cân nhắc giữa Duolingo, Busuu và Memrise.

3. Có nên tham gia lớp học offline không? Hay tự học online đã đủ?

4. Làm sao để duy trì động lực học tập lâu dài?

5. Khoảng bao lâu thì có thể giao tiếp cơ bản được?

Mình rất mong nhận được chia sẻ từ các bạn đã từng trải qua quá trình này. Cảm ơn mọi người!`,
    username: "Minh Học Nhật",
    created_at: "2023-10-27T10:00:00Z",
    views: 142,
    comment_count: 8,
    tags: ["tiếng-nhật", "tự-học", "học-tập"],
    userImage: null,
    category: "Học tập",
    upvotes: 28,
    comments: [
      {
        id: 1,
        post_id: 1,
        user_id: 2,
        username: "Yuki Tanaka",
        avatar_url: "Y",
        content: "Mình học tiếng Nhật được 2 năm rồi. Kinh nghiệm của mình là nên học Hiragana và Katakana trước, vì đây là nền tảng. Sau đó mới học từ vựng và ngữ pháp cơ bản. App Anki rất tốt để học từ vựng nhé!",
        created_at: "2023-10-27T10:05:00Z"
      },
      {
        id: 2,
        post_id: 1,
        user_id: 3,
        username: "Sakura Learning",
        avatar_url: "S",
        content: "Theo mình thì nên kết hợp cả tự học và lớp học. Tự học để có nền tảng, lớp học để luyện phát âm và giao tiếp. Về app thì mình recommend Busuu và LingoDeer cho người mới bắt đầu.",
        created_at: "2023-10-27T10:10:00Z"
      },
      {
        id: 3,
        post_id: 1,
        user_id: 4,
        username: "Nihongo Master",
        avatar_url: "N",
        content: "Động lực là yếu tố quan trọng nhất! Mình khuyên bạn nên xem anime với phụ đề, nghe nhạc Jpop, đọc manga đơn giản. Vừa học vừa giải trí sẽ duy trì được hứng thú lâu dài hơn đấy!",
        created_at: "2023-10-27T10:15:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Review khóa học lập trình React từ cơ bản đến nâng cao",
    content: `Sau 3 tháng học React, mình muốn chia sẻ kinh nghiệm và review về các khóa học online mà mình đã tham gia.

**Khóa học đã học:**
- React - The Complete Guide (Udemy)
- React for Beginners (Wes Bos)
- Epic React (Kent C. Dodds)

**Ưu điểm:**
- Nội dung được cập nhật thường xuyên
- Có project thực tế để practice
- Community hỗ trợ tốt

**Nhược điểm:**
- Một số khóa học khá dài và chi tiết quá mức
- Giá thành cao với các khóa premium

**Kết luận:**
Nhìn chung các khóa học này rất hữu ích cho người mới bắt đầu. Mình recommend bắt đầu với khóa free trước để test xem có phù hợp không.`,
    username: "Code Learner",
    created_at: "2023-10-27T09:30:00Z",
    views: 89,
    comment_count: 5,
    tags: ["react", "javascript", "frontend", "học-tập"],
    userImage: null,
    category: "Lập trình",
    upvotes: 15,
    comments: [
      {
        id: 4,
        post_id: 2,
        username: "React Dev",
        avatar_url: "R",
        content: "Thanks for sharing! Mình cũng đang học React và thấy Epic React của Kent C. Dodds rất hay. Tuy hơi khó nhưng chất lượng thì không chê vào đâu được.",
        created_at: "2023-10-27T09:45:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "Kinh nghiệm tìm việc IT tại Hà Nội cho fresh graduate",
    content: `Vừa tốt nghiệp và may mắn tìm được việc làm đầu tiên trong ngành IT. Mình muốn chia sẻ những kinh nghiệm, tips và tricks trong quá trình tìm việc để giúp các bạn fresh graduate khác.

**Chuẩn bị CV:**
- CV nên ngắn gọn, 1-2 trang là đủ
- Highlight các project đã làm
- Đính kèm link GitHub/Portfolio

**Các kênh tìm việc hiệu quả:**
- TopCV, VietnamWorks
- LinkedIn (rất quan trọng!)
- Các group Facebook về IT
- Mạng lưới bạn bè, alumni

**Phỏng vấn:**
- Chuẩn bị câu hỏi về technical skills
- Soft skills cũng quan trọng không kém
- Research về công ty trước khi phỏng vấn

Chúc các bạn sớm tìm được việc phù hợp!`,
    username: "Fresh Dev",
    created_at: "2023-10-27T08:45:00Z",
    views: 234,
    comment_count: 12,
    tags: ["career", "javascript", "nodejs"],
    userImage: null,
    category: "Nghề nghiệp",
    upvotes: 42,
    comments: []
  },
  {
    id: 4,
    title: "Hướng dẫn setup môi trường phát triển Node.js",
    content: `Bài viết chi tiết về cách setup môi trường development cho Node.js từ A-Z, bao gồm cài đặt Node.js, npm, code editor, và các tools cần thiết khác.

**Bước 1: Cài đặt Node.js**
- Download từ trang chủ nodejs.org
- Kiểm tra phiên bản: node --version
- Cập nhật npm: npm install -g npm@latest

**Bước 2: Setup Code Editor**
- VS Code (recommend)
- Extensions cần thiết: ES6, Node.js modules intellisense
- Setup debugging

**Bước 3: Tools và Libraries**
- Nodemon để auto-restart
- ESLint để code quality
- Prettier để format code

**Bước 4: Database**
- MongoDB hoặc PostgreSQL
- Setup connection
- Database tools: MongoDB Compass, pgAdmin

Hy vọng hướng dẫn này giúp ích cho các bạn mới bắt đầu!`,
    username: "Backend Pro",
    created_at: "2023-10-27T07:20:00Z",
    views: 156,
    comment_count: 6,
    tags: ["nodejs", "javascript", "frontend"],
    userImage: null,
    category: "Lập trình",
    upvotes: 23,
    comments: []
  },
  {
    id: 5,
    title: "Tổng hợp tài liệu học tiếng Anh chuyên ngành IT",
    content: `Chia sẻ bộ tài liệu học tiếng Anh IT mà mình đã sưu tầm được, bao gồm từ vựng chuyên ngành, cách đọc documentation, và tips để improve English skills.

**Từ vựng IT cơ bản:**
- Programming terms
- Database terminology  
- Network và Security
- Software development lifecycle

**Kỹ năng đọc Documentation:**
- Cách scan thông tin nhanh
- Hiểu structure của technical docs
- Practice với official docs của các framework

**Kỹ năng giao tiếp:**
- Presenting technical concepts
- Code review comments
- Writing technical emails

**Resources hữu ích:**
- Technical English courses trên Coursera
- YouTube channels: EnglishPod101, Business English Pod
- Podcasts: Software Engineering Radio

Học tiếng Anh IT sẽ giúp career development rất nhiều đấy!`,
    username: "English IT",
    created_at: "2023-10-26T16:10:00Z",
    views: 98,
    comment_count: 4,
    tags: ["học-tập", "career"],
    userImage: null,
    category: "Kỹ năng",
    upvotes: 18,
    comments: []
  },
  {
    id: 6,
    title: "So sánh Python vs Java cho người mới học lập trình",
    content: `Phân tích ưu nhược điểm của Python và Java, ngôn ngữ nào phù hợp để bắt đầu học lập trình, career path và job opportunities của mỗi ngôn ngữ.

**Python:**
*Ưu điểm:*
- Syntax đơn giản, dễ học
- Community lớn và active
- Nhiều libraries và frameworks
- Ứng dụng đa dạng: web, AI, data science

*Nhược điểm:*
- Performance chậm hơn Java
- Mobile development hạn chế
- Dependency management phức tạp

**Java:**
*Ưu điểm:*
- Performance tốt
- Platform independent
- Strong typing system
- Enterprise applications mạnh

*Nhược điểm:*
- Syntax phức tạp hơn Python
- Boilerplate code nhiều
- Learning curve dốc hơn

**Kết luận:**
- Python: phù hợp cho beginner, data science, AI
- Java: tốt cho enterprise, mobile (Android), web scale lớn

Choice depends on your career goals!`,
    username: "Programming Guide",
    created_at: "2023-10-26T14:30:00Z",
    views: 187,
    comment_count: 9,
    tags: ["python", "career", "học-tập"],
    userImage: null,
    category: "Lập trình",
    upvotes: 31,
    comments: []
  }
];

// Service functions
export const postsService = {
  // Get all posts
  getAllPosts: () => {
    return [...postsData];
  },

  // Get post by ID
  getPostById: (id) => {
    return postsData.find(post => post.id === parseInt(id));
  },

  // Add new post
  addPost: (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      created_at: new Date().toISOString(),
      views: 0,
      comment_count: 0,
      upvotes: 0,
      comments: []
    };
    postsData.unshift(newPost);
    return newPost;
  },

  // Search posts
  searchPosts: (query) => {
    return postsData.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.username.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  },

  // Filter posts by tag
  getPostsByTag: (tag) => {
    return postsData.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
    );
  }
};

export default postsService; 