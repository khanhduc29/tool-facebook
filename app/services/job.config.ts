export type JobField = {
    name: string;
    label: string;
    required: boolean;
    placeholder?: string; // 👈 FIX quan trọng
    type?: "text" | "textarea" | "select" | "switch"; // 🔥 thêm dòng này
    options?: { label: string; value: string }[]; // 🔥 chỉ dùng khi type select
};

export type JobDefinition = {
    label: string;
    actions?: JobAction[];
    fields?: JobField[];

};

export type JobAction = {
    key: string;        // chứa tên thực tế service (để call API)
    label: string;      // nội dung hiển thị ở tab UI
    service: string;    // trỏ đến form config đã có (search_posts, get_post_comments...)
};

export const JobConfig: Record<string, JobDefinition> = {
    scan_posts: {
        label: "Quét bài viết",
        actions: [
            { key: "search", label: "Theo từ khóa", service: "search_posts" },
            { key: "user_feed", label: "Theo User", service: "get_person_timeline_feed" },
            { key: "user_group_feed", label: "Bài đăng nhóm của User", service: "get_person_group_posts_feed" },
            { key: "group_posts", label: "Quét bài đăng nhóm", service: "get_group_posts" }
        ]
    },
    scan_users: {
        label: "Quét người dùng",
        actions: [
            { key: "keyword", label: "Theo từ khóa", service: "search_people" },
            { key: "group_members", label: "Thành viên nhóm", service: "get_group_members" },
            { key: "page_followers", label: "Theo dõi Trang", service: "get_page_followers" },
            { key: "friends", label: "Danh sách bạn bè", service: "get_person_friends" },
            { key: "followers", label: "Người theo dõi User", service: "get_person_followers" },
            { key: "reactors", label: "Tương tác cảm xúc", service: "get_post_reactors" },
            { key: "comments", label: "Bình luận bài viết", service: "get_post_comments" },
            { key: "shares", label: "Chia sẻ bài viết", service: "get_post_shares" },
            { key: "group_posts_users", label: "Người đăng bài nhóm", service: "get_group_posts" }
        ]
    },

    scan_groups: {
        label: "Quét nhóm",
        actions: [
            { key: "keyword", label: "Theo từ khóa", service: "search_groups" },
        ]
    },

    scan_pages: {
        label: "Quét nhóm",
        actions: [
            { key: "keyword", label: "Theo từ khóa", service: "search_pages" },
        ]
    },

    // childrents users
    search_people: {
        label: "Quét người dùng theo từ khóa",
        fields: [
            {
                name: "keyword",
                label: "Từ khóa",
                required: true,
                placeholder: "Ví dụ: bóng đá, sale, marketing",
            },
            {
                name: "limit",
                label: "Số lượng tối đa",
                required: false,
                placeholder: "VD: 100",
            },
            {
                name: "relationship",
                label: "Mối quan hệ",
                type: "select",
                required: false,
                options: [
                    { label: "Mọi người", value: "all" },
                    { label: "Bạn bà của tôi", value: "users_friends" },
                    { label: "Bạn bè của bạn bè", value: "users_friends_of_friends" },
                ],
            },
            {
                name: "address",
                label: "Tỉnh/Thành phố",
                required: false,
                placeholder: "Nhập thành phố...",
            },
            {
                name: "education",
                label: "Học vấn",
                required: false,
                placeholder: "Nhập trường học...",
            },
            {
                name: "job",
                label: "Công việc",
                required: false,
                placeholder: "Nhập nơi làm việc...",
            }
        ],
    },

    get_group_members: {
        label: "Quét thành viên nhóm",
        fields: [
            {
                name: "group_id",
                label: "ID nhóm",
                required: true,
                placeholder: "Ví dụ: 123456789",
            },
        ],
    },

    get_page_followers: {
        label: "Quét người theo dõi trang",
        fields: [
            {
                name: "page_id",
                label: "ID Trang",
                required: true,
                placeholder: "Ví dụ: 1122334455",
            },
        ],
    },

    get_person_friends: {
        label: "Quét bạn bè người dùng",
        fields: [
            {
                name: "user_id",
                label: "ID người dùng",
                required: true,
                placeholder: "Ví dụ: 10001524xxxxx",
            },
        ],
    },

    get_person_followers: {
        label: "Quét người theo dõi tài khoản",
        fields: [
            {
                name: "user_id",
                label: "ID người dùng",
                required: true,
            },
        ],
    },

    get_post_reactors: {
        label: "Quét người thả cảm xúc bài viết",
        fields: [
            {
                name: "post_id",
                label: "ID bài viết",
                required: true,
            },
        ],
    },

    get_post_comments: {
        label: "Quét người bình luận bài viết",
        fields: [
            {
                name: "post_id",
                label: "ID bài viết",
                required: true,
            },
        ],
    },

    get_post_shares: {
        label: "Quét người chia sẻ bài viết",
        fields: [
            {
                name: "post_id",
                label: "ID bài viết",
                required: true,
            },
        ],
    },

    get_person_group_posts: {
        label: "Quét người đăng bài viết trên group",
        fields: [
            {
                name: "user_id",
                label: "ID người dùng",
                required: true,
            },
        ],
    },


    // chilren posts
    search_posts: {
        label: "Tìm bài viết theo từ khóa",
        fields: [
            {
                name: "keyword",
                label: "Từ khóa bài viết",
                required: true,
                placeholder: "VD: kiếm tiền online, crypto, sale",
                type: "textarea"
            },

            {
                name: "limit",
                label: "Giới hạn số bài viết",
                required: false,
                placeholder: "VD: 50",
                type: "text"
            },

            {
                name: "is_recent",
                label: "Chỉ lấy bài viết mới gần đây",
                type: "switch",
                required: false
            },
            {
                name: "exclude_seen",
                label: "Bài viết đã xem",
                type: "switch",
                required: false
            },


            {
                name: "year_range",
                label: "Thời gian bài viết",
                type: "select",
                required: false,
                options: [
                    { label: "Không giới hạn", value: "all" },
                    { label: "2025", value: "2025" },
                    { label: "2024", value: "2024" },
                    { label: "2023", value: "2023" },
                    { label: "2022", value: "2022" },
                    { label: "2021", value: "2021" },
                    { label: "2020 trở về trước", value: "old" }
                ],
            },

            {
                name: "post_from",
                label: "Bài viết từ",
                type: "select",
                required: false,
                options: [
                    { label: "Mọi người", value: "everyone" },
                    { label: "Bạn bè của bạn", value: "friends" },
                    { label: "Bạn", value: "you" },
                    { label: "Nhóm của bạn", value: "your_groups" },
                    { label: "Trang bạn quản lý", value: "your_pages" },
                    { label: "Bài viết công khai", value: "public" },
                ]
            },

            {
                name: "location",
                label: "Bài viết được gắn thẻ tại",
                required: false,
                placeholder: "VD: Hà Nội, HCM",
                type: "text"
            }
        ]
    },

    get_person_timeline_feed: {
        label: "Quét bài viết trên tường User",
        fields: [
            {
                name: "user_id",
                label: "ID người dùng",
                required: true,
                placeholder: "VD: 1000123456789",
            },
            {
                name: "limit",
                label: "Giới hạn số bài lấy",
                required: false,
                placeholder: "VD: 50",
            }
        ]
    },

    get_person_group_posts_feed: {
        label: "Quét bài User đăng trong Group",
        fields: [
            {
                name: "user_id",
                label: "ID người dùng",
                required: true,
                placeholder: "VD: 1000123456789",
            },
            {
                name: "limit",
                label: "Giới hạn số bài lấy",
                required: false,
                placeholder: "VD: 30",
            }
        ]
    },

    get_group_posts: {
        label: "Quét bài đăng trong Group",
        fields: [
            {
                name: "group_id",
                label: "ID nhóm",
                required: true,
                placeholder: "VD: 5678912345678",
            },
            {
                name: "limit",
                label: "Giới hạn số bài lấy",
                required: false,
                placeholder: "VD: 40",
            }
        ]
    },

    // childrent groups
    search_groups: {
        label: "Tìm nhóm theo từ khóa",
        fields: [
            { name: "keyword", label: "Từ khóa", required: true, placeholder: "VD: marketing, crypto" },
            { name: "limit", label: "Giới hạn mỗi từ khóa", required: false, placeholder: "VD: 50" },
            { name: "location", label: "Tỉnh/Thành phố", required: false, placeholder: "VD: Hà Nội" },
            { name: "related_keywords", label: "Từ khóa liên quan", required: false },
            { name: "public_only", label: "Nhóm công khai", required: false },
            { name: "near_me", label: "Gần tôi", required: false },
            { name: "my_groups", label: "Nhóm của tôi", required: false },
            { name: "large_groups", label: "Group ≥ 1000 TV", required: false },
        ],
    },

    // childrent pages
    search_pages: {
        label: "Tìm fanpage theo từ khóa",
        fields: [
            { name: "keyword", label: "Từ khóa", required: true, placeholder: "VD: marketing, crypto" },
            { name: "limit", label: "Giới hạn kết quả mỗi từ khóa", required: false, placeholder: "VD: 50" },
            { name: "location", label: "Nhập vị trí", required: false, placeholder: "VD: Hà Nội" },
            {
                name: "category",
                label: "Hạng mục",
                type: "select",
                required: false,
                options: [
                    { label: "Hạng mục bất kỳ", value: "all" },
                    { label: "Doanh nghiệp hoặc địa điểm ở địa phương", value: "local_business_or_place" },
                    { label: "Công ty, tổ chức hoặc học viện", value: "company_organization_or_institution" },
                    { label: "Thương hiệu hoặc sản phẩm", value: "brand_or_product" },
                    { label: "Nghệ sĩ, ban nhạc hoặc người của công chúng", value: "artist_band_or_public_figure" },
                    { label: "Giải trí", value: "entertainment" },
                    { label: "Hoạt động công cộng", value: "community_activity" },
                ],
            },
        ],
    },






};
