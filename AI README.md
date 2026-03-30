{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica-Bold;\f1\fswiss\fcharset0 Helvetica;\f2\froman\fcharset0 Times-Roman;
\f3\fnil\fcharset0 HelveticaNeue;\f4\fnil\fcharset0 HelveticaNeue-Bold;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;\red20\green20\blue20;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;\cspthree\c10196\c10196\c10196;}
{\*\listtable{\list\listtemplateid1\listhybrid{\listlevel\levelnfc23\levelnfcn23\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{disc\}}{\leveltext\leveltemplateid1\'01\uc0\u8226 ;}{\levelnumbers;}\fi-360\li720\lin720 }{\listname ;}\listid1}
{\list\listtemplateid2\listhybrid{\listlevel\levelnfc23\levelnfcn23\leveljc0\leveljcn0\levelfollow0\levelstartat1\levelspace360\levelindent0{\*\levelmarker \{disc\}}{\leveltext\leveltemplateid101\'01\uc0\u8226 ;}{\levelnumbers;}\fi-360\li720\lin720 }{\listname ;}\listid2}}
{\*\listoverridetable{\listoverride\listid1\listoverridecount0\ls1}{\listoverride\listid2\listoverridecount0\ls2}}
\paperw11900\paperh16840\margl1440\margr1440\vieww19220\viewh13280\viewkind0
\deftab720
\pard\pardeftab720\sa321\partightenfactor0

\f0\b\fs36 \cf0 \expnd0\expndtw0\kerning0
README: \outl0\strokewidth0 \strokec2 AI-Assisted Component Implementation
\fs48 \outl0\strokewidth0 \
\pard\pardeftab720\sa240\partightenfactor0

\fs28 \cf0 Component:
\f1\b0  Tooltip\uc0\u8232 
\f0\b Project:
\f1\b0  Ubiquiti Design Systems \'97 Component Design Challenge\uc0\u8232 
\f0\b Author:
\f1\b0  Su Yang\

\f0\b \
\pard\pardeftab720\partightenfactor0

\f2\b0 \cf0 \outl0\strokewidth0 \strokec2 \uc0\u55358 \u56598  
\f0\b \outl0\strokewidth0 How AI was integrated?\
\pard\pardeftab720\sa240\partightenfactor0

\f1\b0 \cf0 I utilized a specialized workflow connecting 
\f0\b Figma\'92s MCP (Model Context Protocol)
\f1\b0  with 
\f0\b Claude Code
\f1\b0 . This allowed for a direct "Design-to-Code" pipeline where Claude could inspect the properties, tokens, and constraints of my Figma components and translate them into functional React/CSS.\
\
\pard\pardeftab720\partightenfactor0

\f2 \cf0 \outl0\strokewidth0 \strokec2 \uc0\u55357 \u56960  
\f0\b \outl0\strokewidth0 Most \cf3 \kerning1\expnd0\expndtw0 effective workflow and prompts 
\f1\b0 \cf0 \expnd0\expndtw0\kerning0
\
\pard\pardeftab720\partightenfactor0
\cf0 \
Rather than jumping straight into code generation, I implemented a 
\f0\b Two-Phase
\f1\b0  process to ensure design fidelity:\
\

\f0\b 1. The Extraction Phase:
\f1\b0  I prompted Claude Code to perform a deep-scan of the Figma component via the MCP. I specifically asked it to inventory every variable, style, variant, property and auto-layout constraint used in the Tooltip master component\
\

\f0\b 2. The Confirmation Phrase :
\f1\b0  I required Claude code to provide a 
\f0\b Specification Document
\f1\b0 . This allowed me to \outl0\strokewidth0 \strokec2 verify the AI\'92s understanding of the intended UI and behaviors (e.g., z-index, property and interactions).\outl0\strokewidth0 \
\
\pard\pardeftab720\sa240\partightenfactor0

\f0\b \cf0 Benefit:
\f1\b0  This eliminated "hallucinated" styles. By \outl0\strokewidth0 \strokec2 requiring\outl0\strokewidth0  the AI to "read back" the design system to me first, I ensured the final code was a 1:1 reflection of the Figma architecture.\
\
\pard\pardeftab560\slleading20\partightenfactor0

\f3 \cf0 \kerning1\expnd0\expndtw0 "Self-Audit" prompt:\
"Compare the React props of this implementation against the 
\f4\b Figma Component Properties
\f3\b0  identified in our initial scan. List any discrepancies in naming conventions, default values, or missing properties.\'94
\fs26 \
\

\fs28 \'93Self-Test\'94 prompt:
\fs26 \
\pard\pardeftab720\partightenfactor0

\f1\fs28 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 \'93Test responsiveness on mobile devices.When viewports narrower than 768px, does the floating tooltip logic transform into a 
\f0\b \strokec2 Bottom Sheet
\f1\b0 \strokec2  triggered by a tap? Verify that the 'Safe Area' are respected for the bottom sheet's padding"
\f3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 \
\pard\pardeftab560\slleading20\partightenfactor0

\fs26 \cf0 \

\f1\fs28 \expnd0\expndtw0\kerning0
\
\pard\pardeftab720\partightenfactor0
\cf0 \
\pard\pardeftab720\partightenfactor0

\f2 \cf0 \outl0\strokewidth0 \strokec2 \uc0\u9888 \u65039  
\f0\b \cf3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 What the AI got wrong and how you corrected it?
\f1\b0 \
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardeftab720\pardirnatural\partightenfactor0
\cf0 \expnd0\expndtw0\kerning0
\
\pard\pardeftab720\sa240\partightenfactor0
\cf0 While the structural logic was sound, the AI struggled with 
\f0\b Environmental Context
\f1\b0 :\
\pard\tx220\tx720\pardeftab720\li720\fi-720\sa240\partightenfactor0
\ls1\ilvl0
\f0\b \cf0 \kerning1\expnd0\expndtw0 {\listtext	\uc0\u8226 	}\expnd0\expndtw0\kerning0
The Dark Mode Fail:
\f1\b0  I tasked Claude code with generating Dark Mode color tokens based on my Light Mode values. The AI attempted to simply "invert" colors, resulting in the tooltip background that lacked sufficient contrast in dark mode.\
\ls1\ilvl0
\f0\b \kerning1\expnd0\expndtw0 {\listtext	\uc0\u8226 	}\expnd0\expndtw0\kerning0
The Fix:
\f1\b0  I manually overrode the tooltip background token in dark mode to give sufficient contrast.
\fs24 \
\pard\pardeftab720\partightenfactor0
\cf0 \

\fs28 \
\pard\pardeftab720\partightenfactor0

\f2\fs24 \cf0 \outl0\strokewidth0 \strokec2 \uc0\u9878 \u65039 
\f1\fs28  
\f0\b Design Decisions vs. AI Output\cf3 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 \
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardeftab720\pardirnatural\partightenfactor0
\cf3 \
\pard\tx220\tx720\pardeftab720\li720\fi-720\sa240\partightenfactor0
\ls2\ilvl0
\f1\b0 \cf0 {\listtext	\uc0\u8226 	}
\f0\b \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 Collision Logic
\f1\b0 :\strokec2  The AI initially proposed a static positioning model. I manually instructed it to implement \strokec2 "Flip" behavior\strokec2 , ensuring tooltips remain visible when triggered near the edges of the viewport.\outl0\strokewidth0 \
\ls2\ilvl0\kerning1\expnd0\expndtw0 {\listtext	\uc0\u8226 	}
\f0\b \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 The Accessibility Gap
\f1\b0 :\strokec2  The AI initially treated \strokec2 onFocus\strokec2  triggers as optional. I enforced the integration of focus-state logic to ensure the component met \strokec2 WCAG accessibility standards\strokec2  for keyboard-only users.\
\pard\pardeftab720\sa240\partightenfactor0
\ls2\ilvl0\cf0 \kerning1\expnd0\expndtw0 \outl0\strokewidth0 {\listtext	\uc0\u8226 	}
\f0\b \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 Pressure-Testing Pattern Logic
\f1\b0 : When the AI suggested that tooltips on disabled elements should not be interactive, I challenged the "Why." I ultimately decided to allow Rich Variant tooltips (with action button) on disabled elements to explain why a port or device was inactive, and link to a page if needed, a high-value pattern for network admins.
\f2\fs24 \
\pard\tx720\pardeftab720\sa240\partightenfactor0

\f1 \cf0 \outl0\strokewidth0 \
\pard\pardeftab720\partightenfactor0

\f2 \cf0 \
\pard\pardeftab720\partightenfactor0

\f0\b\fs28 \cf0 Other AI tools have been used:
\f1\b0 \
\
Claude\
For brainstorm, benchmarks, help me understand front-end implementation\
\
Lovable (Abandoned)\
Attempted for implementing components, but output was too generic, couldn't match the specificity of the token system or variant logic.
\fs24 \
\pard\pardeftab720\partightenfactor0

\f2 \cf0 \
}