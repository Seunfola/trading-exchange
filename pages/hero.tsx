
const Hero = () => {
  return (
<div className="w-full h-screen">
      <div
        className="w-full h-full bg-contain bg-center"
        style={{ backgroundImage: "url('image.png')" }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50 text-white p-8">
          <h2 className="text-4xl font-bold py-4 mb-2">
            Your One-Step Solution to solving forex echange
            </h2>
          <p className="text-lg mt-4 py-6 text-center">
            This is a detailed description of the feature or content. 
            <br /> 
            You can explain the benefit or provide context for the background image.
          </p>
          <button className="px-6 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-600 mt-4">
            Call to Action
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero