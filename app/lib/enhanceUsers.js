// lib/enhanceUsers.js
const departments = ['HR', 'Engineering', 'Marketing', 'Design', 'Sales'];

export function enhanceUsers(users) {
  return users.map((user) => ({
    ...user,
    department: departments[Math.floor(Math.random() * departments.length)],
    rating: Math.floor(Math.random() * 5) + 1,
  }));
}
