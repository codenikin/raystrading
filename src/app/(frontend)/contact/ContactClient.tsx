'use client'
import { SimpleContactForm } from '@/components/SimpleContactForm'
import { useEffect } from 'react'
import Image from 'next/image'

interface ContactClientProps {
  schemaMarkup: string
}

interface ContactInfo {
  type: 'phone' | 'email' | 'location'
  title: string
  value: string
  text: string
  href: string
  bgColor: string
  iconColor: string
  hoverColor: string
  icon: string
}

const contactData: ContactInfo[] = [
  {
    type: 'phone',
    title: 'Call Us',
    text: 'speak direct with our experts',
    value: '+919442532024',
    href: 'tel:+919442532024',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverColor: 'hover:text-blue-700',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  },
  {
    type: 'email',
    title: 'Email Us',
    text: 'send us your requirements',
    value: 'sales@rayasgroup.com',
    href: 'mailto:sales@rayasgroup.com',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    hoverColor: 'hover:text-green-700',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    type: 'location',
    title: 'Visit Us',
    text: 'Mon-Sat: 9AM-7PM',
    value: ' 66/3, near Murgan temple,Hosur,Tamil Nadu 635109 ',
    href: 'https://wa.me/919442532024',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hoverColor: 'hover:text-purple-700',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  },
]

export const ContactClient: React.FC<ContactClientProps> = ({ schemaMarkup }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = schemaMarkup
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [schemaMarkup])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow relative">
        <div className="pt-[80px]">
          <div className="relative w-full h-[320px] md:h-[620px]">
            <Image
              src="/images/battery123.jpg"
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
          <section className="py-20 lg:py-28 bg-slate-50">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    {contactData.map((contact) => (
                      <div
                        key={`${contact.type}`}
                        className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 card-hover slide-right delay-100"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 ${contact.bgColor} rounded-lg flex items-center justify-center`}
                          >
                            <svg
                              className={`w-6 h-6 ${contact.iconColor}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={contact.icon}
                              ></path>
                              {contact.type === 'location' && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                              )}
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                              {contact.title}
                            </h3>
                            <p className="text-black dark:text-black">{contact.value}</p>
                            <p className="text-black dark:text-black">{contact.text}</p>
                            <a href={contact.href} className="text-black">
                              {contact.href}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <SimpleContactForm />
              </div>

              {/* Google Maps */}
              <div className="mt-12 w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d74345.76628497598!2d77.83271004999999!3d12.7395272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bae717095de991f%3A0x62946e968417794!2s66%2F3%2C%20near%20Murgan%20temple%2C%20Shanthi%20Nagar%20East%2C%20Shanthi%20Nagar%20West%2C%20Hosur%2C%20Tamil%20Nadu%20635109!3m2!1d12.7236119!2d77.82524839999999!5e1!3m2!1sen!2sin!4v1757652422224!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EZVIZ Dubai Location"
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
