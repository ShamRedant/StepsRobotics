import Image from "next/image";
import { Star } from "lucide-react";

// ✅ Page-level metadata (this overrides layout metadata)
export const metadata = {
  title: "About – STEPS Robotics",
  description:
    "STEPS Robotics is dedicated to delivering high-quality robotics, coding, and STEM learning experiences for kids. Through structured programs, expert educators, and VEX robotics platforms, we help students develop real-world skills, confidence, and a passion for innovation.",
  openGraph: {
    title: "About – STEPS Robotics",
    description:
      "STEPS Robotics is dedicated to delivering high-quality robotics, coding, and STEM learning experiences for kids. Through structured programs, expert educators, and VEX robotics platforms, we help students develop real-world skills, confidence, and a passion for innovation.",
    url: "https://stepsrobotics.com/about",
    images: [
      {
        url: "https://stepsrobotics.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "Robotics programs",
    "STEM workshops",
    "Robotics for kids",
    "STEPS Robotics programs",
    "Robotics classes"
  ],
};

const features = [
    {
        icon: "/about/engaing.png",
        title: "Engaging Learning Experiences:",
        text: "Lessons are designed to feel like play, yet packed with real-world skills and knowledge",
    },
    {
        icon: "/about/impact.png",
        title: "Mentors Who Inspire:",
        text: "Our trainers aren't just teachers – they're innovators, guiding children to think big and aim high.",
    },
    {
        icon: "/about/mentor.png",
        title: "Impact Across Communities:",
        text: "From bustling cities to remote villages, we bring STEM learning everywhere it's needed.",
    },
];

const cards = [
    {
        id: 1,
        title: "123 Robot",
        circleText: "VEX 123",
        color: "#7C4182",
        side_color: "#7C4182",
        image: "/about/about-1.png",
        description:
            "To turn off the 123 Robot, press and hold the ‘Start’ button for 3 seconds, as shown in this animation. The indicator light will first show yellow, and you will hear a click sound.",
    },
    {
        id: 2,
        title: "Super Car",
        circleText: "VEX GO",
        color: "#00959F",
        image: "/about/about-2.png",
        description:
            "Long before electric cars, engineers experimented with simple energy sources like rubber bands and springs. Some of the earliest racing toys used this technique.",
    },
    {
        id: 3,
        title: "Autopilot",
        circleText: "VEX IQ",
        color: "#0075C9",
        image: "/about/about-3.png",
        description:
            "Standard build for VEX IQ robot designed to be built quickly and driven with the Controller or coded with VEXcode IQ.",
    },
];


const course = {
    heroictitle: 'Future-Ready Kids Start Here!',
    heroicimage: '/about/about_img.png',
}


export default function Page() {
    return (
        <>

            <div className="container-spacing">
                {/* Banner Hero Section */}
                <div className="about container-spacing p-6">
                    <div className="container-custom space-y-8 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
                            <div className="w-full h-full order-2 md:order-1">
                                {course.heroicimage ? (
                                    <Image
                                        src={course.heroicimage}
                                        alt={course.heroictitle || 'Course image'}
                                        width={600}
                                        height={484}
                                        className="programs-about-image rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="text-left about_banner_heading order-1 md:order-2">
                                <h2 className="heroic-title text-3xl font-semibold">
                                    Future-Ready Kids <br></br> Started Here!
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>



                {/* About Section */}
                <section className="py-12 bg-white px-4 sm:px-8 lg:px-30 container-custom">

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug text-left text-font-orbitron">
                        About{" "}
                        <span className="text-yellow-500 font-orbitron">STEPS Robotics</span>
                    </h2>



                    {/* Description */}
                    <p className="text-gray-600 text-sm dotted-cards sm:text-base lg:text-lg mb-10 leading-relaxed text-font-poppins text-left">
                        Welcome to STEPS Robotics - Shaping the Future of School STEM
                        Learning. Launched in 2025, STEPS Robotics is here to redefine STEM
                        education for K-12 schools.
                    </p>


                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* LEFT SIDE IMAGES */}
                        <div className="grid grid-cols-2 gap-4 p-4 items-center about_steps_robotics relative">
                            {/* Left Column (two stacked images) */}
                            <div className="flex flex-col gap-4">
                                <div style={{ backgroundColor: "#0FB5ED" }} className="rounded-[10px]">
                                    <Image
                                        src="/about/about-1.png"
                                        alt="Image 1"
                                        width={400}
                                        height={300}
                                        className="rounded-lg object-cover w-full h-auto"
                                    />
                                </div>

                                <div style={{ backgroundColor: "#33C4C4" }} className="rounded-[10px] ml-15">
                                    <Image
                                        src="/about/about-3.png"
                                        alt="Image 3"
                                        width={400}
                                        height={300}
                                        className="rounded-lg object-cover w-full h-auto"
                                    />
                                </div>
                            </div>

                            {/* Right Column (single centered image + star card) */}

                            <div className="flex flex-col items-start">
                                {/* Image container */}
                                <div style={{ backgroundColor: "#FFB43F" }} className="rounded-[10px] w-65 h-65 about-img3">
                                    <Image
                                        src="/about/about-2.png"
                                        alt="Image 2"
                                        width={400}
                                        height={300}
                                        className="rounded-lg object-cover"
                                    />
                                </div>

                                {/* Star Rating Card */}
                                <div className="bg-white flex flex-shrink about_five_start shadow-md rounded-[12px] bottom-15 right-35 p-4 flex items-start gap-3 max-w-md absolute">
                                    <div className="flex-shrink-0 mt-1">
                                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            <b>5.0</b> (3.5K reviews)
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            <b>Congratulations!</b>
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* RIGHT SIDE TEXT & FEATURES */}
                        <div className="flex flex-col justify-center text-center md:text-left space-y-4">
                            <h3 className="text-2xl text-left font-orbitron">
                                From Curiosity to Certainty — Shaping the Future with AI & Robotics
                            </h3>
                            {/* <h3 className="text-2xl pr-10 font-semibold text-gray-800 font-orbitron">
                                From Curiosity to Certainty — Shaping the Future with AI & Robotics
                            </h3> */}
                            <p className="text-gray-600 text-lg about_STEPS font-poppins">
                                At STEPS Robotics, we&apos;re on a mission to turn young curiosity into
                                groundbreaking innovation. We create hands-on, playful learning
                                spaces where children dive into STEM, coding, robotics, AI, ML, IoT,
                                AR, and VR — building skills that prepare them for the world of
                                tomorrow.
                            </p>

                            <div>
                                {features.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 pt-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={item.icon}
                                                alt={item.title}
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-semibold text-base">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/** Vision */}
                <section className="pt-10 px-4 sm:px-8 lg:px-16 bg-gray-50 relative ">
                    {/* Decorative rocket element at top */}
                    <div className="absolute top-[-60] left-[-20]">
                        <div className="w-40 h-40">
                            {/* <img src="/about/rocket_finder.gif" /> */}
                            <Image
                                src="/about/rocket_finder.gif"
                                alt="Rocket finder"
                                width={300}   // add actual width
                                height={300}  // add actual height
                                unoptimized   // for GIFs only
                            />
                        </div>
                    </div>

                    <div className="max-w-7xl pt-18 pb-25 mx-auto relative container-custom">
                        {/* Main Yellow Container */}
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[3rem] px-8 pt-10 relative overflow-hidden">

                            {/* Content Grid - Changed to 60/40 split */}
                            <div className="grid grid-cols-1 about_VMV lg:grid-cols-[60%_40%] gap-8 lg:gap-12">

                                {/* Left Column - Text Content (60%) */}
                                <div className="space-y-8 lg:space-y-10">

                                    {/* Vision */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                            {/* Eye Icon */}
                                            <Image
                                                src="/about/our_vision.png"
                                                alt="Girl with STEPS Robotics and Robot"
                                                width={300}
                                                height={300}
                                                className="object-contain w-30 h-30"
                                                priority
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 font-orbitron our_vmv_heading">
                                                Our <span className="text-white font-orbitron">Vision</span>
                                            </h3>
                                            <p className="text-gray-900 text-sm lg:text-base text_poppins our_vmv_para">
                                                In a world rich with untapped potential, STEPS Robotics envisions a future where advanced STEM learning is a universal right, not a privilege. We strive for a world where children from all walks of life hold the tools of innovation in their hands.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mission */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                            {/* Target Icon */}
                                            <Image
                                                src="/about/our_mission.png"
                                                alt="Girl with STEPS Robotics and Robot"
                                                width={300}
                                                height={300}
                                                className="object-contain w-80 h-80"
                                                priority
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 font-orbitron our_vmv_heading">
                                                Our <span className="text-white font-orbitron">Mission</span>
                                            </h3>
                                            <p className="text-gray-900 text-sm lg:text-base text_poppins our_vmv_para">
                                                In a world rich with untapped potential, STEPS Robotics envisions a future where advanced STEM learning is a universal right, not a privilege. We strive for a world where children from all walks of life hold the tools of innovation in their hands.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Values */}
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                            {/* Heart Hand Icon */}
                                            <Image
                                                src="/about/our_values.png"
                                                alt="Girl with STEPS Robotics and Robot"
                                                width={300}
                                                height={300}
                                                className="object-contain w-80 h-80"
                                                priority
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 font-orbitron our_vmv_heading">
                                                Our <span className="text-white font-orbitron">Values</span>
                                            </h3>
                                            <p className="text-gray-900 text-sm lg:text-base text_poppins our_vmv_para">
                                                At STEPS Robotics, we believe in making STEM education accessible, inclusive, and inspiring for every child. We value curiosity that drives innovation, integrity that builds trust, and collaboration that unites communities.
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Column - Image (40%) */}
                                <div className="relative flex items-center justify-center">
                                    <div className="relative about_VMV_img w-full max-w-md lg:max-w-lg flex justify-center">
                                        <Image
                                            src="/about/vision.png"
                                            alt="Girl with STEPS Robotics and Robot"
                                            width={300}
                                            height={300}
                                            className="object-contain w-80 h-auto"
                                            priority
                                        />
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </section>

                {/**Projects */}
                <section className="py-12 bg-white px-4 sm:px-8 lg:px-30">

                    <div className="container-custom">

                        {/* Section Heading */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug text-left text-font-orbitron">
                            Explore{" "}
                            <span className="text-yellow-500 font-orbitron">STEPS Robotics</span> Projects
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-sm dotted-cards sm:text-base lg:text-lg mb-10 leading-relaxed text-font-poppins text-left">
                            Real students bringing ideas to life with robotics kits and hands-on STEM—capturing
                            the spirit of STEPS Robotics projects.
                        </p>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-25 max-w-7xl mx-auto px-6">
                            {cards.map((card, i) => (
                                <div key={i} className="relative flex flex-col items-center">
                                    {/* Circle Text */}
                                    <div
                                        className="w-32 h-16 rounded-t-full flex items-center justify-center text-white font-semibold text-lg shadow-lg mb-[-1rem] z-10"
                                        style={{ backgroundColor: card.color }}
                                    >
                                        {card.circleText}
                                    </div>

                                    {/* Wrapper for card + outside side bars + bottom strip */}
                                    <div className="relative w-full max-w-sm flex justify-center">

                                        {/* Left Side Bar */}
                                        <div
                                            className="absolute left-[-18px] top-1/2"
                                            style={{
                                                width: '18px',
                                                height: '50%',
                                                backgroundColor: card.color,
                                                borderBottomLeftRadius: '5rem',
                                            }}
                                        ></div>

                                        {/* Right Side Bar */}
                                        <div
                                            className="absolute right-[-18px] top-1/2"
                                            style={{
                                                width: '18px',
                                                height: '50%',
                                                backgroundColor: card.color,
                                                borderBottomRightRadius: '5rem',
                                            }}
                                        ></div>

                                        {/* Card Container */}
                                        <div className="relative bg-white text-center rounded-2xl shadow-lg overflow-hidden w-auto h-auto">
                                            {/* Image */}
                                            <div className="p-6">
                                                <div className="p-4 bg-gray-200 rounded-lg">
                                                    <Image
                                                        src={card.image}
                                                        alt={card.title}
                                                        width={400}
                                                        height={250}
                                                        className="mx-auto object-contain w-full h-40"
                                                    />
                                                </div>
                                            </div>

                                            {/* Text */}
                                            <div className="min-h-45">
                                                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                                                <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                                            </div>
                                        </div>

                                        {/* Bottom Colored Strip */}
                                        <div
                                            className="absolute bottom-0 left-[-18px] right-[-18px] h-4 rounded-b-2xl flex justify-center"
                                            style={{ backgroundColor: card.color }}
                                        >
                                            {/* Circle Button */}
                                            <div
                                                className="absolute mt-1 -top-6 w-16 h-16 bg-white rounded-full shadow-md flex justify-center items-center border-4"
                                                style={{
                                                    borderWidth: '12px',
                                                    borderColor: card.color,
                                                }}
                                            >
                                                <span className={`${card.color.replace("bg-", "text-")} text-lg font-bold`}>
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </section>

                {/** Fun Filled Gallery */}
                <section
                    className="py-12 bg-white px-4 sm:px-8 lg:px-30"
                    style={{
                        background: 'linear-gradient(135deg, #FFEA7F 0%, #F5CD4D 100%)',
                    }}
                >
                    {/* Title and Paragraph */}

                    <div className="container-custom">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug text-left text-font-orbitron">
                            Explore Our{" "}
                            <span className="text-white text-font-orbitron">Fun-Filled Gallery</span>
                        </h2>

                        {/* Description */}
                        <p className="text-black text-sm dotted-cards sm:text-base lg:text-lg mb-10 leading-relaxed text-font-poppins text-left">
                            Discover moments of creativity, innovation, and joy as our young innovators bring STEM concepts to life.
                        </p>

                        {/* Image Split Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Side - Single Big Image */}
                            <div className="flex justify-center items-center">
                                <div className="w-full h-full">
                                    <Image
                                        src="/about/fun-1.png"
                                        alt="Left Image"
                                        width={600}
                                        height={600}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Right Side - 4 Images Grid */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 px-5 ">
                                <Image
                                    src="/about/fun-2.png"
                                    alt="Right Image 1"
                                    width={300}
                                    height={300}
                                    className="w-full h-full     rounded-lg"
                                />
                                <Image
                                    src="/about/fun-3.png"
                                    alt="Right Image 2"
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <Image
                                    src="/about/fun-4.png"
                                    alt="Right Image 3"
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <Image
                                    src="/about/fun-5.png"
                                    alt="Right Image 4"
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>



            </div>

        </>
    );
}
