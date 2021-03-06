import SignUpForm from 'components/SignUpForm';

const Register = () => {
  return (
    <div className=" bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Accounts saved with GraphCMS</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
