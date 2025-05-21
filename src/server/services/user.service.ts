import "server-only";

export const userService = {
  getAllUsers: async () => {
    return [
      {
        name: "Dominik",
        birthday: new Date(2006, 2, 24),
      },
    ];
  },
};
