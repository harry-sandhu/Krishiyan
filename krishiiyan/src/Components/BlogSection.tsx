import blog from '../assets/Images/blog1.jpeg'
import blog1 from '../assets/Images/blog2.png'

const BlogSection = () => {
    return (
        <section className="p-4 sm:p-6 md:p-8 lg:p-10 bg-white">
            {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 mx-auto bg-[#f3f1fe] w-[80px] sm:w-[90px] md:w-[100px] h-[40px] sm:h-[44px] md:h-[48px] text-[#3bc238]">Blog</h1> */}
            <div className="bg-gray-100 rounded-xl p-5">
                <p className="text-lg sm:text-xl text-center mb-4 text-green-700 font-extrabold">"Interaction with Input Dealers for illustrating our model and getting reviews, so far we have interacted with more than 75+</p>

                <p className="text-lg sm:text-xl text-center mb-8 text-green-700 font-extrabold">dealers in Gujarat, Maharashtra, Tamil Nadu and received positive response for our software service"</p>

                <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
                    <img src="Images/our-team-1.png" alt="Description for Image 1" className="w-full sm:w-1/3 shadow-lg rounded-3xl" />
                    <img src="Images/our-team-2.png" alt="Description for Image 2" className="w-full sm:w-1/3 shadow-lg rounded-3xl" />
                </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-5 mt-5">
                <p className="text-lg sm:text-xl text-center mb-4 leading-3 text-green-700 font-extrabold">"KrishiYan selected for Agri-business Orientation programme organized by Ministry of Agriculture and CCS-National Institute of Agriculture Marketing Incubation Centre."</p>

                <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
                    <img src={blog1} alt="Description for Image 2" className="w-full sm:w-1/3 shadow-lg rounded-3xl" />
                </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-5 mt-5">
                <p className="text-green-700 text-lg sm:text-xl text-center mb-4 font-extrabold">"KrishiYan at Mehsana Startup Mahotsav"</p>

                <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
                    <img src={blog} alt="Description for Image 1" className="w-full sm:w-1/3 shadow-lg rounded-3xl" />
                </div>
            </div>
        </section>
    );
}

export default BlogSection;
