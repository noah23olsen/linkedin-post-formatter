// LinkedIn Post Formatter Vue Application

const app = Vue.createApp({
    data() {
        return {
            postContent: '',
            formattedContent: '',
            showEmojiPicker: false,
            showArrowPicker: false,
            copySuccess: false,
            selectedTemplate: '',

            // Common emojis for quick access
            commonEmojis: [
                '👍', '👏', '🔥', '💡', '✅', '⭐', '🚀', '💪',
                '📊', '📈', '🎯', '🏆', '💼', '📝', '🔍', '🤔',
                '😊', '🙌', '👉', '🌟', '📢', '🔔', '📌', '🎉'
            ],

            // Arrow options
            arrowOptions: [
                '→', '⟶', '⇒', '⟹', '⇨', '⇢', '➔', '➜', '➙', '➛', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦',
                '↑', '⟰', '⇑', '⇧', '⇪', '⇮', '⇯', '⤊', '⤴', '↿', '⥣', '⥘', '⥜', '↾', '↥', '↨', '⍐', '⬆',
                '↓', '⟱', '⇓', '⇩', '⇪', '⇯', '⤋', '⤵', '⇟', '⥥', '⥙', '⥝', '⥡', '↧', '↨', '⍗', '⬇',
                '↔', '↕', '⟷', '⟺', '⇔', '⇕', '⇦', '⇄', '⇆', '⇋', '⇌', '⇹', '⇼', '⥊', '⥋', '⥌', '⥍', '⥎', '⥏'
            ],

            // Post templates
            templates: [
                {
                    name: 'Professional Achievement',
                    content: `🎉 Excited to share that I've [achievement]!

✨ [Brief description of what this means]

🙏 Thanks to [people or organizations to thank]

#Hashtags #Relevant #Keywords`
                },
                {
                    name: 'Industry Insight',
                    content: `💡 INSIGHT: [Main insight or statistic]

Here's what this means for [industry/professionals]:

→ [Point 1]
→ [Point 2]
→ [Point 3]

What's your take on this? Share your thoughts below!

#Hashtags #Relevant #Keywords`
                },
                {
                    name: 'Career Tip',
                    content: `📌 CAREER TIP:

[Main tip or advice]

Why it matters:
• [Reason 1]
• [Reason 2]
• [Reason 3]

What career tips would you add to this list?

#CareerAdvice #ProfessionalDevelopment`
                },
                {
                    name: 'Question Post',
                    content: `🤔 QUESTION:

[Your thought-provoking question]

I'm curious to hear different perspectives on this.

Share your thoughts in the comments below!

#Discussion #Networking #ProfessionalGrowth`
                }
            ]
        }
    },

    computed: {
        characterCount() {
            return this.postContent.length;
        }
    },

    methods: {
        // Update the formatted content in real-time
        updateFormattedContent() {
            // Basic conversion of line breaks to HTML
            let formatted = this.postContent
                .replace(/\n/g, '<br>')
                .replace(/\s\s/g, '&nbsp;&nbsp;');

            this.formattedContent = formatted;
        },

        // Apply different formatting options
        applyFormatting(type) {
            // Get the textarea element
            const textarea = document.querySelector('textarea');
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = this.postContent.substring(start, end);

            let formattedText = '';

            switch (type) {
                case 'bold':
                    // Using special Unicode characters for "bold" effect
                    formattedText = this.convertToBold(selectedText);
                    break;

                case 'italic':
                    // Using special Unicode characters for "italic" effect
                    formattedText = this.convertToItalic(selectedText);
                    break;

                case 'bullet':
                    // Add bullet point
                    formattedText = '• ' + selectedText;
                    break;

                case 'arrow':
                    // Show arrow picker instead of inserting default arrow
                    this.showArrowPicker = true;
                    return;

                case 'separator':
                    // Add separator line
                    formattedText = '\n───────────────\n';
                    break;
            }

            // Replace the selected text with the formatted text
            this.postContent =
                this.postContent.substring(0, start) +
                formattedText +
                this.postContent.substring(end);

            // Update the formatted content
            this.updateFormattedContent();

            // Focus back on the textarea
            this.$nextTick(() => {
                textarea.focus();
                textarea.setSelectionRange(
                    start + formattedText.length,
                    start + formattedText.length
                );
            });
        },

        // Convert text to "bold" using Unicode characters
        convertToBold(text) {
            if (!text) return '';

            // Mathematical Sans-Serif Bold characters (more compatible)
            const normalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const boldChars = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';

            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const index = normalChars.indexOf(char);
                if (index !== -1) {
                    result += boldChars[index];
                } else {
                    result += char;
                }
            }

            return result;
        },

        // Convert text to "italic" using Unicode characters
        convertToItalic(text) {
            if (!text) return '';

            // Mathematical Sans-Serif Italic characters (more compatible)
            const normalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const italicChars = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';

            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const index = normalChars.indexOf(char);
                if (index !== -1) {
                    result += italicChars[index];
                } else {
                    result += char;
                }
            }

            return result;
        },

        // Insert emoji at cursor position
        insertEmoji(emoji) {
            const textarea = document.querySelector('textarea');
            const start = textarea.selectionStart;

            this.postContent =
                this.postContent.substring(0, start) +
                emoji +
                this.postContent.substring(start);

            this.updateFormattedContent();

            // Hide emoji picker after selection
            this.showEmojiPicker = false;

            // Focus back on the textarea
            this.$nextTick(() => {
                textarea.focus();
                textarea.setSelectionRange(start + emoji.length, start + emoji.length);
            });
        },

        // Insert arrow at cursor position or before selected text
        insertArrow(arrow) {
            const textarea = document.querySelector('textarea');
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = this.postContent.substring(start, end);

            let newText;
            if (selectedText) {
                // If text is selected, add arrow before it
                newText = arrow + ' ' + selectedText;
            } else {
                // If no text is selected, just insert the arrow
                newText = arrow;
            }

            this.postContent =
                this.postContent.substring(0, start) +
                newText +
                this.postContent.substring(end);

            this.updateFormattedContent();

            // Hide arrow picker after selection
            this.showArrowPicker = false;

            // Focus back on the textarea
            this.$nextTick(() => {
                textarea.focus();
                textarea.setSelectionRange(
                    start + newText.length,
                    start + newText.length
                );
            });
        },

        // Apply selected template
        applyTemplate() {
            if (this.selectedTemplate !== '') {
                const template = this.templates[this.selectedTemplate];

                // Confirm if there's existing content
                if (this.postContent.trim() !== '') {
                    if (!confirm('This will replace your current content. Continue?')) {
                        this.selectedTemplate = '';
                        return;
                    }
                }

                this.postContent = template.content;
                this.updateFormattedContent();
                this.selectedTemplate = '';
            }
        },

        // Clear the content
        clearContent() {
            if (this.postContent.trim() !== '' &&
                confirm('Are you sure you want to clear all content?')) {
                this.postContent = '';
                this.updateFormattedContent();
            }
        },

        // Copy formatted content to clipboard
        copyToClipboard() {
            // Use the original text content, not the HTML
            navigator.clipboard.writeText(this.postContent)
                .then(() => {
                    this.copySuccess = true;
                    setTimeout(() => {
                        this.copySuccess = false;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy to clipboard. Please try again.');
                });
        }
    },

    mounted() {
        // Initialize the formatted content
        this.updateFormattedContent();
    }
});

// Mount the Vue app
app.mount('#app'); 