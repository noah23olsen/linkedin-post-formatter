// LinkedIn Post Formatter Vue Application

const app = Vue.createApp({
    data() {
        return {
            editorContent: '',
            characterCount: 0,
            showEmojiPicker: false,
            copySuccess: false,
            selectedTemplate: '',
            activeFormats: {
                bold: false,
                italic: false,
                underline: false
            },

            // Common emojis for quick access
            commonEmojis: [
                '👍', '👏', '🔥', '💡', '✅', '⭐', '🚀', '💪',
                '📊', '📈', '🎯', '🏆', '💼', '📝', '🔍', '🤔',
                '😊', '🙌', '👉', '🌟', '📢', '🔔', '📌', '🎉'
            ],

            // Arrow symbols
            arrows: [
                // Right arrows
                '→', '⟶', '⇒', '⇨', '⟹', '➔', '➜', '➙', '➛', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦', '➧', '➨',
                // Down arrows
                '↓', '⟱', '⇓', '⬇️', '⇩', '⇣', '⤓', '⥥', '⬦', '⏬', '⯆', '⯯',
                // Up arrows
                '↑', '⟰', '⇑', '⬆️', '⇧', '⇞', '⤒', '⥣', '⏫', '⯅', '⯭',
                // Left arrows
                '←', '⟵', '⇐', '⇦', '⟸', '⬅️',
                // Bidirectional arrows
                '↔', '↕', '⟷', '⇔', '⇕', '⟺', '⬄', '⬍'
            ],
            showArrowPicker: false,

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

    methods: {
        // Update the content from the editor
        updateContent() {
            this.editorContent = this.$refs.editor.innerHTML;
            this.updateCharCount();
            this.checkActiveFormats();
        },

        // Update character count
        updateCharCount() {
            // Get text content without HTML tags for character count
            const textContent = this.$refs.editor.textContent || '';
            this.characterCount = textContent.length;
        },

        // Check which formats are currently active
        checkActiveFormats() {
            this.activeFormats.bold = document.queryCommandState('bold');
            this.activeFormats.italic = document.queryCommandState('italic');
            this.activeFormats.underline = document.queryCommandState('underline');
        },

        // Execute formatting commands
        execCommand(command) {
            document.execCommand(command, false, null);

            // For specific commands, ensure we use LinkedIn-compatible tags
            if (command === 'italic') {
                // Convert any <i> tags to <em> for better LinkedIn compatibility
                const italicElements = this.$refs.editor.querySelectorAll('i');
                italicElements.forEach(el => {
                    const em = document.createElement('em');
                    em.innerHTML = el.innerHTML;
                    el.parentNode.replaceChild(em, el);
                });
            } else if (command === 'underline') {
                // Ensure underlines use <u> tag instead of text-decoration
                const styledElements = this.$refs.editor.querySelectorAll('[style*="text-decoration: underline"]');
                styledElements.forEach(el => {
                    const u = document.createElement('u');
                    u.innerHTML = el.innerHTML;
                    el.parentNode.replaceChild(u, el);
                });
            }

            this.$refs.editor.focus();
            this.updateContent();
        },

        // Execute commands with arguments
        execCommandWithArg(command, arg) {
            if (arg) {
                document.execCommand(command, false, arg);
                this.$refs.editor.focus();
                this.updateContent();
            }
        },

        // Insert emoji at cursor position
        insertEmoji(emoji) {
            // Insert at cursor position
            this.insertTextAtCursor(emoji);

            // Hide emoji picker after selection
            this.showEmojiPicker = false;

            // Focus back on the editor
            this.$refs.editor.focus();
        },

        // Insert arrow at cursor position
        insertArrow(arrow) {
            // Insert at cursor position
            this.insertTextAtCursor(arrow);

            // Keep arrow picker open (don't hide it)
            // this.showArrowPicker = false;

            // Focus back on the editor
            this.$refs.editor.focus();
        },

        // Insert text at cursor position
        insertTextAtCursor(text) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            range.deleteContents();

            const textNode = document.createTextNode(text);
            range.insertNode(textNode);

            // Move cursor after inserted text
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);

            this.updateContent();
        },

        // Handle paste event to preserve formatting
        handlePaste(e) {
            // Let the browser handle the paste with formatting
            setTimeout(() => {
                this.updateContent();
                this.ensureLinkedInCompatibleFormatting();
            }, 0);
        },

        // Ensure formatting is LinkedIn compatible
        ensureLinkedInCompatibleFormatting() {
            const editor = this.$refs.editor;

            // Convert <i> to <em> for better LinkedIn compatibility
            const italicElements = editor.querySelectorAll('i');
            italicElements.forEach(el => {
                const em = document.createElement('em');
                em.innerHTML = el.innerHTML;
                el.parentNode.replaceChild(em, el);
            });

            // Ensure underlines use <u> tag instead of text-decoration
            const styledElements = editor.querySelectorAll('[style*="text-decoration: underline"]');
            styledElements.forEach(el => {
                const u = document.createElement('u');
                u.innerHTML = el.innerHTML;
                el.parentNode.replaceChild(u, el);
            });

            this.updateContent();
        },

        // Apply selected template
        applyTemplate() {
            if (this.selectedTemplate !== '') {
                const template = this.templates[this.selectedTemplate];

                // Confirm if there's existing content
                if (this.$refs.editor.textContent.trim() !== '') {
                    if (!confirm('This will replace your current content. Continue?')) {
                        this.selectedTemplate = '';
                        return;
                    }
                }

                // Set the template content
                this.$refs.editor.innerHTML = template.content.replace(/\n/g, '<br>');
                this.updateContent();
                this.selectedTemplate = '';
            }
        },

        // Clear the content
        clearContent() {
            if (this.$refs.editor.textContent.trim() !== '' &&
                confirm('Are you sure you want to clear all content?')) {
                this.$refs.editor.innerHTML = '';
                this.updateContent();
            }
        },

        // Copy formatted content to clipboard
        copyToClipboard() {
            // First ensure formatting is LinkedIn compatible
            this.ensureLinkedInCompatibleFormatting();

            // Create a temporary element to hold the HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.editorContent;

            // Append to body (required for some browsers)
            document.body.appendChild(tempDiv);

            // Select the content
            const range = document.createRange();
            range.selectNodeContents(tempDiv);

            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // Execute copy command
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    this.copySuccess = true;
                    setTimeout(() => {
                        this.copySuccess = false;
                    }, 2000);
                } else {
                    console.error('Copy command was unsuccessful');
                    alert('Failed to copy to clipboard. Please try again.');
                }
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert('Failed to copy to clipboard. Please try again.');
            }

            // Clean up
            selection.removeAllRanges();
            document.body.removeChild(tempDiv);
        }
    },

    mounted() {
        // Focus the editor when the app is mounted
        this.$nextTick(() => {
            this.$refs.editor.focus();

            // Add event listener for selection changes to update active formats
            document.addEventListener('selectionchange', () => {
                if (document.activeElement === this.$refs.editor) {
                    this.checkActiveFormats();
                }
            });

            // Add keyup event listener to check formats
            this.$refs.editor.addEventListener('keyup', () => {
                this.checkActiveFormats();
            });

            // Add mouseup event listener to check formats
            this.$refs.editor.addEventListener('mouseup', () => {
                this.checkActiveFormats();
            });
        });
    }
});

// Mount the Vue app
app.mount('#app'); 