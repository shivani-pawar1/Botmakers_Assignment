const UserCard = (): JSX.Element => {
  return (
    <div className="p-4 bg-green-100 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-green-800">
        User Dashboard
      </h3>
      <p className="text-gray-700 mt-2">
        Welcome User 🎉
      </p>
    </div>
  );
};

export default UserCard;