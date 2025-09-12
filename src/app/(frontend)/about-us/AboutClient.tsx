'use client'

import Image from 'next/image'
import { useState } from 'react'
type IconName =
  | 'award'
  | 'check-circle'
  | 'shield'
  | 'star'
  | 'truck'
  | 'phone'
  | 'cog'
  | 'camera'
  | 'cash'
  | 'truck-delivery'
  | 'delivery-fast'

type Feature = {
  id: number
  icon: IconName
  bgColor: string
  iconColor: string
  title: string
  description: string
  badges: { label: string; color: string }[]
  delay: string
}

const features: Feature[] = [
  {
    id: 1,
    icon: 'cog',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'Qualified Technicians',
    description:
      'Our expert team ensures quick and reliable installation and replacement, so your vehicle or inverter runs smoothly..',
    badges: [
      { label: 'Replace battery', color: 'bg-red-500' },
      { label: 'Qualified technicias', color: 'bg-gray-400' },
    ],
    delay: '0.4',
  },
  {
    id: 2,
    icon: 'truck-delivery',
    bgColor: 'bg-cyan-100',
    iconColor: '#52b3c9',
    title: 'Free Delivery',
    description: 'Get your battery delivered right to your doorstep without extra charges.',
    badges: [
      { label: 'Free Shipping', color: '#52b3c9' },
      { label: 'Fast Delivery', color: '#3a9bc1' },
    ],
    delay: '0.5',
  },
  {
    id: 3,
    icon: 'cash',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Cash on Delivery',
    description: 'Pay easily and securely only after you receive your product.',
    badges: [
      { label: 'Global Support', color: 'bg-green-500' },
      { label: 'Quality Assured', color: 'bg-teal-500' },
    ],
    delay: '0.6',
  },
]
const faqData = [
  {
    id: 1,
    question: 'How long has Rayas Trading been in the battery business?',
    answer:
      'Rayas Trading has been serving Hosur and Bangalore for over 10 years, providing reliable battery sales, installation, and after-sales support for homes, vehicles, and businesses.',
  },
  {
    id: 2,
    question: 'Are you an authorized dealer of Amaron and Exide batteries?',
    answer:
      'Yes, we are an authorized dealer for Amaron and Exide, offering 100% genuine products with manufacturer warranties and expert installation service.',
  },
  {
    id: 3,
    question: 'Do you provide warranty support and installation?',
    answer:
      'Absolutely. Every battery purchased from us comes with full warranty support, and our skilled technicians ensure safe and professional installation at your location.',
  },
  {
    id: 4,
    question: 'Which areas do you serve?',
    answer:
      'We proudly serve customers across Hosur and nearby Bangalore regions, offering doorstep delivery and installation for both residential and commercial needs.',
  },
  {
    id: 5,
    question: 'Do you offer after-sales support?',
    answer:
      'Absolutely! We provide comprehensive after-sales support including technical assistance, maintenance services, and warranty claims. Our support team is available to help you with any questions or issues you may encounter.',
  },
]

const doubledSliders = [
  {
    data: {
      slider: '/images/dahua1.png',
      sliderAlt: 'Dahua Camera 1',
    },
  },
  {
    data: {
      slider: '/images/dahua2.png',
      sliderAlt: 'Dahua Camera 2',
    },
  },
  {
    data: {
      slider: '/images/dahua3.png',
      sliderAlt: 'Dahua Camera 3',
    },
  },
]
const iconPaths: Record<IconName, string> = {
  'truck-delivery':
    'M4 2h11.5a2 2 0 0 1 2 2v2H20a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2v3a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3H8v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.5V4a2 2 0 0 1 2-2M4 10v4h2v-4H4m14 0v4h2v-4h-2M4 16v3h2v-3H4m14 0v3h2v-3h-2m1-11h-3v4h5V8h-2Z',
  'delivery-fast':
    'M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z M5 6h5v2H5V6z M19 13c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z',
  cash: 'M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12zm-6-7c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
  award:
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  shield:
    'M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
  star: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
  truck:
    'M8.5 18.5h2m0 0h2m-2 0v-6m6 6h2m0 0h2m-2 0v-6M3 4h13.5m0 0h3a1.5 1.5 0 011.5 1.5v.75M16.5 4v3.75m0 0h4.5m0 0v10.125c0 .621-.504 1.125-1.125 1.125h-1.875m-1.5-11.25H3m0 0v10.125C3 18.496 3.504 19 4.125 19h1.875m-3-11.25V4.875C3 4.254 3.504 3.75 4.125 3.75h10.75c.621 0 1.125.504 1.125 1.125V7.75m-12 0h12',
  phone:
    'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  cog: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  camera:
    'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
}

export const AboutPage: React.FC = ({}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }
  return (
    <>
      <div className="pt-[80px] min-h-screen flex flex-col bg-white">
        <div className="relative w-full h-[320px] md:h-[620px]">
          <Image
            src="/images/batteryreplace.png"
            alt="Dahua Solutions Banner"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg animate-bounce">
              <span className="text-white font-anton">Who</span>
              <span className="text-red-500 font-anton"> We are</span>
            </h1>
            <p className="text-xl max-w-3xl text-white/90">
              Fast, reliable, and affordable battery replacement service you can trust
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center px-3 py-1 bg-cyan-100 text-teal-700 rounded-full text-sm font-medium mb-4 badge-reveal hover-badge"
              data-delay="0.1"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Battery expert in Hosur,Bangalore
            </span>
            <h2
              className="text-4xl font-bold text-gray-900 mb-4 title-reveal font-anton"
              data-delay="0.2"
            >
              OUR <span className="text-red-600 font-anton">SERVICES</span>
            </h2>
            <p className="text-lg leading-relaxed text-black subtitle-reveal" data-delay="0.3">
              As an authorized dealer of Amaron and Exide batteries, we ensure that every product we
              deliver is 100% genuine and backed by the manufacturer’s warranty. Our mission is
              simple: to offer the best quality batteries at competitive prices, supported by
              professional installation and after-sales service.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => (
              <div
                className="p-8 border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 card-reveal group"
                data-delay={feature.delay}
                key={feature.id}
              >
                <div
                  className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <svg
                    className={`w-8 h-8 ${typeof feature.iconColor === 'string' && feature.iconColor.startsWith('#') ? '' : feature.iconColor}`}
                    style={
                      typeof feature.iconColor === 'string' && feature.iconColor.startsWith('#')
                        ? { color: feature.iconColor }
                        : undefined
                    }
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={iconPaths[feature.icon]} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">{feature.description}</p>
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  {feature.badges.map((badge, idx) => (
                    <span className="flex items-center" key={idx}>
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${typeof badge.color === 'string' && badge.color.startsWith('#') ? '' : badge.color}`}
                        style={
                          typeof badge.color === 'string' && badge.color.startsWith('#')
                            ? { backgroundColor: badge.color }
                            : undefined
                        }
                      />
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="p-8 bg-white">
        <div className="container mx-auto px-4 py-12 bg-white">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="relative max-w-[700px] mx-auto group">
                <div className="flex justify-center relative">
                  <Image
                    src="/images/batterywholesale.png"
                    loading="eager"
                    width={600}
                    height={300}
                    alt="EZVIZ Security Cameras"
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-800"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 justify-center items-center m-8 transform hover:scale-105 transition-transform duration-800">
              <h2
                className="text-blue-500 text-sm font-medium tracking-wider mb-4 "
                id="about-heading"
              >
                <span className="mr-2"> A B O U T</span> U S
              </h2>

              <h3 className="text-3xl font-semibold text-gray-800 mb-6 " id="about-title">
                Buy Inverter Batteries in Hosur | Rayas Trading – Free Delivery & Expert
                Installation
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6 " id="about-p1">
                Buy reliable inverter batteries from Rayas Trading, one of the leading battery
                distributors in Hosur. We offer top brands like Amaron and Exide at the best prices,
                ensuring long backup and durability for your home or business. Enjoy free doorstep
                delivery, cash on delivery, and professional installation by qualified technicians.
                With our quick replacement service and genuine warranty support, you can stay
                powered without worries. Choose Rayas Trading for trusted service and unbeatable
                value in inverter batteries.
              </p>

              <p className="text-gray-600 leading-relaxed " id="about-p2">
                Our skilled team is focused on offering exceptional customer service and technical
                support, guaranteeing that every installation adheres to the highest standards of
                quality and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="slider-container overflow-hidden">
          <div className="slider-track flex animate-slide-right-to-left">
            {[...doubledSliders, ...doubledSliders, ...doubledSliders, ...doubledSliders].map(
              (slider, index) => (
                <div
                  key={`slider-${index}-${slider.data.sliderAlt}`}
                  className="slider-item flex-shrink-0 px-4 mx-2"
                >
                  <div className="slider-card relative flex h-48 w-48 sm:h-64 sm:w-64 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg shadow-blue-100/50 border border-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 group">
                    <div className="slider-image-container flex h-full w-full items-center justify-center p-4 sm:p-6">
                      <Image
                        src={slider.data.slider}
                        width={600}
                        height={300}
                        alt={slider.data.sliderAlt}
                        className="slider-image max-h-full max-w-full object-contain opacity-85 brightness-110 transition-all duration-300 hover:opacity-100 hover:scale-110"
                      />
                    </div>
                    <div className="slider-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600/90 to-transparent p-3 sm:p-4 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="slider-name text-center text-sm sm:text-base font-medium text-white">
                        {slider.data.sliderAlt}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div> */}

      {/* FAQ Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-4 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
