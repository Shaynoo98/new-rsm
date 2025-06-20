"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, Wind, Thermometer } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const generalFaqs = [
  {
    question: "How long does air conditioning installation take?",
    answer:
      "Most standard installations take between 4-8 hours, depending on the complexity of the job. We'll provide you with a clear timeline during our initial consultation.",
  },
  {
    question: "Do you offer 24/7 emergency service?",
    answer:
      "Currently, we don't offer 24/7 emergency service. However, we respond to all inquiries promptly during business hours and will schedule urgent repairs as quickly as possible.",
  },
  {
    question: "What areas of the Yarra Valley do you service?",
    answer:
      "We service all areas of the Yarra Valley, including Healesville, Yarra Glen, Lilydale, Coldstream, Wandin, Seville, Woori Yallock, Launching Place, Yarra Junction, Warburton, Millgrove, and Wesburn.",
  },
  {
    question: "Why do you only use Fujitsu air conditioning units?",
    answer:
      "Fujitsu is renowned for reliability, energy efficiency, and innovative technology. We've chosen to specialize in Fujitsu systems to ensure we can provide the best service and support for our customers.",
  },
  {
    question: "Do you provide warranties on your installations?",
    answer:
      "Yes, we provide comprehensive warranties on both our workmanship and the Fujitsu units we install. Specific warranty terms will be discussed during your consultation.",
  },
  {
    question: "How often should I service my air conditioning unit?",
    answer:
      "We recommend annual servicing to maintain optimal performance, energy efficiency, and to prevent potential issues. Regular maintenance can significantly extend the life of your unit.",
  },
  {
    question: "Can you help me choose the right size unit for my space?",
    answer:
      "We conduct thorough assessments of your space, considering factors like room size, insulation, ceiling height, and usage patterns to recommend the perfect unit for your needs.",
  },
  {
    question: "What's included in your maintenance service?",
    answer:
      "Our maintenance service includes cleaning filters, checking refrigerant levels, inspecting electrical connections, testing system performance, and identifying any potential issues before they become problems.",
  },
  {
    question: "How much does air conditioning installation cost?",
    answer:
      "Installation costs vary depending on the unit size, complexity of installation, and specific requirements. We provide free, no-obligation quotes tailored to your specific needs.",
  },
  {
    question: "Do you remove old air conditioning units?",
    answer:
      "Yes, we can remove and dispose of your old air conditioning unit as part of our installation service. This will be discussed and included in your quote if required.",
  },
]

const evaporativeFaqs = [
  {
    question: "My evaporative cooler isn't working, do I need a new thermostat?",
    answer:
      "In about 90% of cases, the problem isn't the thermostat but rather the heater's circuit board, which may have connectivity issues. For an accurate diagnosis and repair, a technician should inspect the system.",
  },
  {
    question: "My evaporative cooler is making funny noises",
    answer:
      "Over time, normal wear can cause parts to loosen, wear down, or become unbalanced. For an accurate diagnosis, we recommend a professional inspection.",
  },
  {
    question:
      "I've noticed my evaporative cooler isn't producing air as cold as before, why might the efficiency be decreasing?",
    answer:
      "For optimal performance, we suggest having your evaporative cooler professionally inspected. Common causes of reduced cooling efficiency include deteriorated cooling pads or improper water distribution, which can prevent effective cooling and result in warmer airflow.",
  },
  {
    question: "The evaporative cooler vents aren't emitting any airflow",
    answer:
      "The lack of airflow could indicate a ducting system issue. We recommend a professional inspection to diagnose the problem. If disconnected ducts are found, the technician can typically reconnect them during the service visit.",
  },
  {
    question:
      "The evaporative cooler's thermostat is set to [X]°C, but the actual output temperature measures [Y]°C warmer than the set point.",
    answer:
      "This temperature discrepancy suggests potential ducting issues. We recommend a professional inspection to properly diagnose and resolve the problem. The technician can typically repair any disconnected ducts during the service visit.",
  },
  {
    question: "The evaporative cooling unit is producing abnormal operational noise levels during runtime.",
    answer:
      "The excessive noise during operation could indicate several potential issues, including loose components, worn parts, or mechanical imbalances. We recommend a professional inspection to accurately diagnose the cause—whether it requires motor adjustments, rebalancing the unit, or replacing faulty components. A technician can then implement the appropriate solution to restore quiet, efficient operation.",
  },
  {
    question:
      "My evaporative cooler's control panel display is completely blank—no lights, text, or indicators appear when powered on.",
    answer:
      "Initial Checks:\n• Verify the remote has fresh batteries installed\n• Check for any visible damage to the remote or its display\n\nConnection Issues:\n• Inspect all connecting cables for signs of wear or damage\n• Ensure all cable connections are secure at both ends\n\nSystem Reset:\n• Power cycle the system by turning it off at the main power source\n• Wait 30 seconds before restoring power\n• Allow 2-3 minutes for the system to fully reboot\n\nProfessional Assistance:\n• If the issue continues after these steps\n• Contact a qualified technician for:\n  - Comprehensive system diagnostics\n  - Cable replacement if needed\n  - Control board evaluation",
  },
  {
    question: "Water is leaking from the evaporative cooler unit.",
    answer:
      "If you observe water leaking from your evaporative cooler, we recommend scheduling a service inspection. Common causes include:\n\n• Clogged drainage systems\n• Cracked water distribution lines\n• Failing pump seals or reservoir issues\n\nA qualified technician can identify the source and perform necessary repairs or replacements to prevent water damage and restore efficient operation.",
  },
  {
    question:
      "Do evaporative cooling systems utilize the same ceiling vent ducts as central heating and cooling systems?",
    answer:
      "Ceiling vents that deliver both heating and cooling typically indicate one of two system configurations:\n\n• A ducted heating system with an added cooling unit\n• A fully integrated ducted split system (combining heating and cooling)",
  },
  {
    question:
      "I have a fault (number) on my evaporative cooler's control panel. What are the recommended troubleshooting steps for this specific issue?",
    answer:
      "When an error code appears on your evaporative cooler's display, it usually indicates either:\n\n• A system fault requiring attention, or\n• Routine maintenance needs (like filter cleaning or seasonal servicing).\n\nFirst Step:\n• Power cycle the unit by switching it off at the breaker for 5+ minutes, then restart.\n\nIf the error persists:\n• Schedule a professional inspection to:\n  - Diagnose the specific issue\n  - Perform necessary repairs\n  - Complete any overdue maintenance\n\nNote: Ignoring persistent error codes may lead to reduced efficiency or component damage.",
  },
  {
    question: "The evaporative cooler powers on normally but fails to deliver airflow through the ventilation system.",
    answer:
      "The lack of airflow suggests a potential ducting system problem. For proper diagnosis and repair, we recommend scheduling a service visit with a qualified technician. They will:\n\n• Inspect all duct connections and pathways\n• Identify any blockages, leaks, or disconnections\n• Perform necessary repairs to restore proper airflow.",
  },
  {
    question:
      "Do you carry replacement controllers for evaporative cooling systems? Ours has been misplaced and we need a new unit.",
    answer:
      "While we don't specialize in spare parts sales, we're happy to help you source the correct replacement controller. Please share your unit's brand and model number, and we'll assist you in finding the appropriate part.",
  },
]

const ductedSplitFaqs = [
  {
    question: "I require a replacement thermostat for my ducted split system as the current unit is malfunctioning.",
    answer:
      "In most cases (approximately 90%), the root cause isn't the thermostat itself but connectivity issues in the heater's internal control board. A professional inspection is required to:\n\n• Verify proper electrical connections\n• Test board functionality\n• Determine if repair or replacement is needed.",
  },
  {
    question: "My ducted split system is producing unusual operational noises.",
    answer:
      "Over time, normal component degradation can result in:\n\n• Loosened or displaced parts\n• Material wear and reduced performance\n• System imbalances affecting operation\n\nA professional inspection is recommended to:\n\n• Identify worn components\n• Assess alignment and stability\n• Recommend precise repairs or replacements.",
  },
  {
    question:
      "My ducted split system is demonstrating reduced operational efficiency compared to its previous performance levels.",
    answer:
      "For optimal performance, we advise booking a full system service. This will include:\n✔ Complete component inspection\n✔ Filter cleaning/replacement\n✔ Performance testing\n\nDirty filters alone can reduce efficiency by up to 15%—addressing this often delivers immediate improvement while preventing strain on other components.",
  },
  {
    question:
      "My ducted split system's cooling capacity has significantly diminished - I'm no longer achieving the previous temperature differential.",
    answer:
      "For maximum efficiency with your inverter system:\n• Avoid frequent power cycling - Continuous operation maintains stable temperatures\n• Set and maintain your preferred temperature - This allows the inverter to modulate power smoothly\n• Expect 20-30% energy savings versus conventional stop-start operation\n\nIf problems persist despite proper usage:\n\n• Document when issues occur (specific modes/time frames)\n• Check for error codes on your thermostat\n• Schedule professional diagnostics to assess:\n  - Refrigerant charge levels\n  - Inverter board performance\n  - Sensor calibration",
  },
  {
    question:
      "My ducted split system completes its startup sequence without error codes, but I'm observing zero airflow from all supply vents. What could explain this apparent disconnect between normal initialization and lack of air delivery?",
    answer:
      "When experiencing reduced or absent airflow—whether from specific vents or the entire system—the most common cause is compromised duct integrity. This often requires:\n\n• Reconnection of any separated duct segments\n• Resealing of joints with mastic or foil tape\n• Realignment of collapsed or kinked sections\n\nFor systems that start normally but deliver zero airflow:\n• Primary suspect: Complete duct disconnection near the air handler\n• Secondary checks: Blockages or damper failures\n• Professional service recommended: Technicians use specialized tools to:\n  - Locate hidden separations with pressure testing\n  - Verify proper static pressure levels\n  - Ensure balanced airflow post-repair",
  },
  {
    question:
      "My ducted split system is maintaining a temperature of Y°C despite the thermostat being set to X°C, resulting in a [X-Y]°C variance from the desired set point.",
    answer:
      "This temperature discrepancy could stem from multiple causes, including refrigerant levels, sensor calibration, or airflow balance. We recommend a professional diagnostic to accurately identify and resolve the specific issue.",
  },
  {
    question:
      "The ducted split system is producing abnormal operational noise levels during both heating and cooling cycles.",
    answer:
      "To properly identify the source of the operational noise, we recommend scheduling a technician visit for:\n\n• Comprehensive inspection of all moving components\n• Sound profiling to isolate the noise type/location\n• Performance testing under various load conditions\n\nMost Common Causes:\n• Fan assembly issues (bearing wear, blade imbalance, or motor failure)\n• Overworked system from incorrect sizing or thermostat settings\n• Refrigerant flow abnormalities causing compressor strain\n\nProfessional service will determine whether repair or component replacement is needed to restore quiet operation",
  },
  {
    question:
      "The ducted split system's control interface is non-responsive with no display illumination or visual output.",
    answer:
      "Troubleshooting Steps for Blank Controller Display:\n\n1. Battery Check (if applicable):\n   • Replace batteries with fresh ones\n   • Clean battery contacts if corroded\n\n2. Power Cycle the System:\n   • Turn off at the circuit breaker for 5+ minutes\n   • Restore power and allow full reboot sequence\n\n3. Cable Inspection:\n   • Examine visible wiring for damage (fraying/pinched cables)\n   • Ensure all connectors are securely seated\n\nIf the display remains inactive after these steps, professional service is required to diagnose:\n\n• Control board failure\n• Display component issues\n• Internal wiring faults\n\nWhy Professional Help Matters:\n✔ Prevents voiding warranties with improper repairs\n✔ Ensures correct diagnosis of electrical issues\n✔ Restores full system functionality",
  },
  {
    question:
      "My home has centralized heating and cooling through ceiling vents, but I'm unable to locate the actual HVAC unit. Could you advise on typical installation locations for inspection?",
    answer:
      "For properties with ceiling vents providing both heating and cooling, you most likely have one of these two configurations:\n\n1. Ducted Split System\n   • Indoor Unit: Evaporator coil installed in ceiling cavity\n   • Outdoor Unit: Condenser located externally (typically beside or behind the property)\n   • Features: Single integrated system for both functions\n\n2. Ducted Heater with Add-on Cooling\n   • Indoor Unit: Heating unit installed in roof space\n   • Outdoor Unit: Separate cooling condenser unit\n   • Features: Combined system from separate components\n\nLocating Your Equipment:\n\n• Check roof cavity for air handler/evaporator coil\n• Inspect property perimeter for condenser unit(s)\n• Look for service access panels in ceilings/closets\n\nKey Differences:\nSplit systems use refrigerant lines between units, while add-on systems often have separate ducting connections. A professional can verify your specific configuration during a maintenance visit.",
  },
  {
    question:
      "I'm receiving error code [number] on my ducted split system's controller. What are the recommended troubleshooting steps for this specific fault?",
    answer:
      "Fault codes typically indicate either:\n\n• A system malfunction requiring attention, or\n• Routine maintenance needs (e.g., filter cleaning or scheduled servicing).\n\nFirst Step: System Reset\n\n• Power cycle the unit by switching off at the breaker for 5+ minutes\n• Restore power and observe if the error clears\n\nIf the Code Persists:\nSchedule professional service to:\n✔ Diagnose the specific issue\n✔ Perform necessary repairs\n✔ Complete any overdue maintenance\n\nNote: Ignoring persistent fault codes may lead to reduced efficiency or component damage.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div initial="initial" animate="animate" className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <HelpCircle className="w-16 h-16 mx-auto text-white" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-6">
              Frequently Asked Questions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl max-w-3xl mx-auto">
              Find answers to common questions about our air conditioning and evaporative cooling services
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* General FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">General Air Conditioning FAQs</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Common questions about our air conditioning services
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {generalFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <AccordionItem value={`general-item-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Evaporative Cooler FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Wind className="w-8 h-8 text-cyan-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Evaporative Cooler FAQs</h2>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Common questions about evaporative cooling systems
              </p>
            </div>

            <Card className="border-cyan-200 dark:border-cyan-800">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {evaporativeFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <AccordionItem value={`evap-item-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Ducted Split System FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Thermometer className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ducted Split System FAQs</h2>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Common questions about ducted split air conditioning systems
              </p>
            </div>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {ductedSplitFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <AccordionItem value={`ducted-item-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Get in touch with our friendly team for personalized assistance.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white text-blue-600 px-8 py-3 text-lg font-medium shadow-lg transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contact Us Today
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
