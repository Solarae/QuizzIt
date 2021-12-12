// AUTH ACTIONS // 
export const GET_SIGNED_IN = 'GET_SIGNED_IN'
export const CONNECT_SOCKET = "CONNECT_SOCKET"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"

// PROFILE ACTIONS //
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS"
export const EDIT_PROFILE_FAIL = "EDIT_PROFILE_FAIL"
export const DELETE_PROFILE_SUCCESS = "DELETE_PROFILE_SUCCESS"
export const DELETE_PROFILE_FAIL = "DELETE_PROFILE_FAIL"

// INBOX ACTIONS // 
export const GET_INBOX_REQ = "GET_INBOX_REQ"
export const GET_INBOX_SUCCESS = "GET_INBOX_SUCCESS"
export const GET_INBOX_FAIL = "GET_INBOX_FAIL"
export const RECEIVE_NOTIFICATIONS = "RECEIVE_NOTIFICATIONS"
export const READ_NOTIFICATION_SUCCESS = "READ_NOTIFICATION_SUCCESS"
export const READ_NOTIFICATION_FAIL = "READ_NOTIFICATION_FAIL"

// FRIEND REQUEST ACTIONS //
export const GET_FRIENDREQUESTS_REQ = "GET_FRIENDREQUESTS_REQ"
export const GET_FRIENDREQUESTS_SUCCESS = "GET_FRIENDREQUESTS_SUCCESS"
export const GET_FRIENDREQUESTS_FAIL = "GET_FRIENDREQUESTS_FAIL"
export const SEND_FRIENDREQUEST_SUCCESS = "SEND_FRIENDREQUEST_SUCCESS"
export const SEND_FRIENDREQUEST_FAIL = "SEND_FRIENDREQUEST_FAIL"
export const ACCEPT_FRIENDREQUEST_SUCCESS = "ACCEPT_FRIENDREQUEST_SUCCESS"
export const ACCEPT_FRIENDREQUEST_FAIL = "ACCEPT_FRIENDREQUEST_FAIL"
export const DECLINE_FRIENDREQUEST_SUCCESS = "DECLINE_FRIENDREQUEST_SUCCESS"
export const DECLINE_FRIENDREQUEST_FAIL = "DECLINE_FRIENDREQUEST_FAIL"
export const RECEIVE_FRIENDREQUEST = "RECEIVE_FRIENDREQUEST"

// FRIEND ACTIONS //
export const GET_FRIENDS_REQ = "GET_FRIENDS_REQ"
export const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS"
export const GET_FRIENDS_FAIL = "GET_FRIENDS_FAIL"
export const UNFRIEND_SUCCESS = "UNFRIEND_SUCCESS"
export const UNFRIEND_FAIL = "UNFRIEND FAIL"

// PLATFORM ACTIONS //
export const GET_PLATFORM_REQ = "GET_PLATFORM_REQ"
export const CREATE_PLATFORM_REQ = "CREATE_PLATFORM_REQ"
export const EDIT_PLATFORM_REQ = "EDIT_PLATFORM_REQ"
export const DELETE_PLATFORM_REQ = "DELETE_PLATFORM_REQ"
export const JOIN_PLATFORM_REQ = "JOIN_PLATFORM_REQ"
export const LEAVE_PLATFORM_REQ = "LEAVE_PLATFORM_REQ"
export const REPORT_PLATFORM_REQ = "REPORT_PLATFORM_REQ"
export const EDIT_MEMBER_ROLE_REQ = "EDIT_MEMBER_ROLE_REQ"
export const GET_PLAT_LEADERBOARD_REQ = "GET_PLAT_LEADERBOARD_REQ"
export const GET_MEMBERLIST_REQ = "GET_MEMBERLIST_REQ"
export const GET_PLATFORM_SUCCESS = "GET_PLATFORM_SUCCESS"
export const GET_PLATFORM_FAIL = "GEt_PLATFORM_FAIL"
export const CREATE_PLATFORM_SUCCESS = "CREATE_PLATFORM_SUCCESS"
export const CREATE_PLATFORM_FAIL = "CREATE_PLATFORM_FAIL"
export const EDIT_PLATFORM_SUCCESS = "EDIT_PLATFORM_SUCCESS"
export const EDIT_PLATFORM_FAIL = "EDIT_PLATFORM_FAIL"
export const EDIT_PLATFORM_IMG_SUCCESS = "EDIT_PLATFORM_IMG_SUCCESS"
export const EDIT_PLATFORM_IMG_FAIL = "EDIT_PLATFORM_IMG_FAIL"
export const DELETE_PLATFORM_SUCCESS = "DELETE_PLATFORM_SUCCESS"
export const DELETE_PLATFORM_FAIL = "DELETE_PLATFORM_FAIL"
export const JOIN_PLATFORM_SUCCESS = "JOIN_PLATFORM_SUCCESS"
export const JOIN_PLATFORM_FAIL = "JOIN_PLATFORM_FAIL"
export const LEAVE_PLATFORM_SUCCESS = "LEAVE_PLATFORM_SUCCESS" 
export const LEAVE_PLATFORM_FAIL = "LEAVE_PLATFORM_FAIL"
export const REPORT_PLATFORM_SUCCESS = "REPORT_PLATFORM_SUCCESS" 
export const REPORT_PLATFORM_FAIL = "REPORT_PLATFORM_FAIL"
export const EDIT_MEMBER_ROLE_SUCCESS = "EDIT_MEMBER_ROLE_SUCCESS"
export const EDIT_MEMBER_ROLE_FAIL = "EDIT_MEMBER_ROLE_FAIL"
export const GET_PLAT_LEADERBOARD_SUCCESS = "GET_PLAT_LEADERBOARD_SUCCESS"
export const GET_PLAT_LEADERBOARD_FAIL = "GET_PLAT_LEADERBOARD_FAIL"
export const SEARCH_PLAT_LEADERBOARD_SUCCESS = "SEARCH_PLAT_LEADERBOARD_SUCCESS"
export const SEARCH_PLAT_LEADERBOARD_FAIL = "SEARCH_PLAT_LEADERBOARD_FAIL"
export const GET_MEMBERLIST_SUCCESS = "GET_MEMBERLIST_SUCCESS"
export const GET_MEMBERLIST_FAIL = "GET_MEMBERLIST_FAIL"

// QUIZ ACTIONS //
export const QUIZ_LOADING = "QUIZ_LOADING"
export const GET_QUIZ = "GET_QUIZ"
export const GET_QUIZ_FAIL = "GET_QUIZ_FAIL"
export const CREATE_QUIZ_REQ = "CREATE_QUIZ_REQ"
export const CREATE_QUIZ_SUCCESS = "CREATE_QUIZ_SUCCESS"
export const CREATE_QUIZ_FAIL = "CREATE_QUIZ_FAIL"
export const EDIT_QUIZ = "EDIT_QUIZ"
export const EDIT_QUIZ_FAIL = "EDIT_QUIZ_FAIL"
export const DELETE_QUIZ = "DELETE_QUIZ"
export const DELETE_QUIZ_FAIL = "DELETE_QUIZ_FAIL"
export const UPVOTE_QUIZ = "UPVOTE_QUIZ"
export const UPVOTE_QUIZ_FAIL = "UPVOTE_QUIZ_FAIL"
export const DOWNVOTE_QUIZ = "DOWNVOTE_QUIZ"
export const DOWNVOTE_QUIZ_FAIL = "DOWNVOTE_QUIZ_FAIL"
export const REPORT_QUIZ = "REPORT_QUIZ"
export const REPORT_QUIZ_FAIL = "REPORT_QUIZ_FAIL"
export const EDIT_QUIZ_THUMBNAIL = "EDIT_QUIZ_THUMBNAIL"
export const EDIT_QUIZ_THUMBNAIL_FAIL = "EDIT_QUIZ_THUMBNAIL_FAIL"
export const GET_QUIZ_LEADERBOARD_REQ = "GET_QUIZ_LEADERBOARD_REQ"
export const GET_QUIZ_LEADERBOARD_SUCCESS = "GET_QUIZ_LEADERBOARD_SUCCESS"
export const GET_QUIZ_LEADERBOARD_FAIL = "GET_QUIZ_LEADERBOARD_FAIL"
export const SEARCH_QUIZ_LEADERBOARD_SUCCESS = "SEARCH_QUIZ_LEADERBOARD_SUCCESS"
export const SEARCH_QUIZ_LEADERBOARD_FAIL = "SEARCH_QUIZ_LEADERBOARD_FAIL"

// QUESTION ACTIONS //
export const ADD_QUIZ_QUESTION = "ADD_QUIZ_QUESTION"
export const ADD_QUIZ_QUESTION_FAIL = "ADD_QUIZ_QUESTION_FAIL"
export const EDIT_QUIZ_QUESTION = "EDIT_QUIZ_QUESTION"
export const EDIT_QUIZ_QUESTION_FAIL = "EDIT_QUIZ_QUESTION_FAIL"
export const DELETE_QUIZ_QUESTION = "DELETE_QUIZ_QUESTION"
export const DELETE_QUIZ_QUESTION_FAIL = "DELETE_QUIZ_QUESTION_FAIL"

// AWARD ACTIONS // 
export const CREATE_AWARD_REQ = "CREATE_AWARD_REQ"
export const CREATE_AWARD_SUCCESS = "CREATE_AWARD_SUCCESS"
export const CREATE_AWARD_FAIL = "CREATE_AWARD_FAIL"
export const EDIT_AWARD_REQ = "EDIT_AWARD_REQ"
export const EDIT_AWARD_SUCCESS = "EDIT_AWARD_SUCCESS"
export const EDIT_AWARD_FAIL = "EDIT_AWARD_FAIL"
export const DELETE_AWARD_REQ = "DELETE_AWARD_REQ"
export const DELETE_AWARD_SUCCESS = "DELETE_AWARD_SUCCESS"
export const DELETE_AWARD_FAIL = "DELETE_AWARD_FAIL"

// SEARCH ACTIONS //
export const SEARCH_PLATFORM_REQ = "SEARCH_PLATFORM_REQ"
export const SEARCH_PLATFORM_SUCCESS = "SEARCH_PLATFORM_SUCCESS"
export const SEARCH_PLATFORM_FAIL = "SEARCH_PLATFORM_FAIL"
export const SEARCH_QUIZ_REQ = "SEARCH_QUIZ_REQ"
export const SEARCH_QUIZ_SUCCESS = "SEARCH_QUIZ_SUCCESS"
export const SEARCH_QUIZ_FAIL = "SEARCH_QUIZ_FAIL"
export const SEARCH_USER_REQ = "SEARCH_USER_REQ"
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS"
export const SEARCH_USER_FAIL = "SEARCH_USER_FAIL"
export const SEARCH_UPDATE_PLATFORM = "SEARCH_UPDATE_PLATFORM"
export const RESET_MAX_PAGES = "RESET_MAX_PAGES"

// SUBMISSION ACTIONS //
export const CREATE_SUBMISSION = "CREATE_SUBMISSION"
export const CREATE_SUBMISSION_FAIL = "CREATE_SUBMISSION_FAIL"
export const GET_SUBMISSION_REQ = "GET_SUBMISSION_REQ"
export const GET_SUBMISSION_SUCCESS = "GET_SUBMISSION_SUCCESS"
export const GET_SUBMISSION_FAIL = "GET_SUBMISSION_FAIL"
export const GET_SUBMISSIONS_REQ = "GET_SUBMISSIONS_REQ"
export const GET_SUBMISSIONS_SUCCESS = "GET_SUBMISSION_SUCCESS"
export const GET_SUBMISSIONS_FAIL = "GET_SUBMISSIONS_FAIL"
export const GET_ONE_SUBMISSION_SUCCESS = "GET_ONE_SUBMISSION_SUCCESS"
export const GET_ONE_SUBMISSION_FAIL = "GET_ONE_SUBMISSION_FAIL"


// REPORT ACTIONS //
export const GET_PLATFORM_REPORT_SUCCESS = "GET_PLATFORM_REPORT_SUCCESS"
export const GET_PLATFORM_REPORT_FAIL = "GET_PLATFORM_REPORT_FAIL"
export const DELETE_REPORT_SUCCESS = "DELETE_REPORT_SUCCESS"
export const DELETE_REPORT_FAIL = "DELETE_REPORT_FAIL"

// GLOBAL ACTIONS //
export const GET_GLOBAL_LEADERBOARD_REQ = "GET_GLOBAL_LEADERBOARD_REQ"
export const GET_GLOBAL_LEADERBOARD_SUCCESS = "GET_GLOBAL_LEADERBOARD_SUCCESS"
export const GET_GLOBAL_LEADERBOARD_FAIL = "GET_GLOBAL_LEADERBOARD_FAIL"
export const SEARCH_GLOBAL_LEADERBOARD_SUCCESS = "SEARCH_GLOBAL_LEADERBOARD_SUCCESS"
export const SEARCH_GLOBAL_LEADERBOARD_FAIL = "SEARCH_GLOBAL_LEADERBOARD_FAIL"