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

        // Execute formatting commands using direct Unicode character mapping
        execCommand(command) {
            const selection = window.getSelection();
            if (selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            if (range.collapsed) return; // No text selected

            // Get the selected text
            const selectedText = range.toString();
            if (!selectedText) return;

            let formattedText = '';

            // Apply direct character mapping based on command
            if (command === 'bold') {
                formattedText = this.convertToBoldUnicode(selectedText);
            } else if (command === 'italic') {
                formattedText = this.convertToItalicUnicode(selectedText);
            } else if (command === 'underline') {
                formattedText = this.convertToUnderlineUnicode(selectedText);
            } else if (command === 'bolditalic') {
                formattedText = this.convertToBoldItalicUnicode(selectedText);
            } else if (command === 'strikethrough') {
                formattedText = this.convertToStrikethroughUnicode(selectedText);
            } else if (command === 'boldunderline') {
                formattedText = this.convertToBoldUnderlineUnicode(selectedText);
            } else if (command === 'boldstrikethrough') {
                formattedText = this.convertToBoldStrikethroughUnicode(selectedText);
            } else if (command === 'script') {
                formattedText = this.convertToScriptUnicode(selectedText);
            } else {
                // Fall back to browser's execCommand for other commands
                document.execCommand(command, false, null);
                this.$refs.editor.focus();
                this.updateContent();
                return;
            }

            // Insert the formatted text
            range.deleteContents();
            const textNode = document.createTextNode(formattedText);
            range.insertNode(textNode);

            // Move cursor after the inserted text
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);

            this.$refs.editor.focus();
            this.updateContent();
        },

        // Convert to bold Unicode characters - using LinkedIn-proven characters
        convertToBoldUnicode(text) {
            // Using the exact LinkedIn-proven bold characters from the example
            const boldMap = {
                'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
                'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
                'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
                'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
                'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
                'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
                '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵',
                ' ': ' ', ',': ',', '.': '.', '!': '!', '?': '?', ':': ':', ';': ';', '-': '-', '_': '_',
                '(': '(', ')': ')', '[': '[', ']': ']', '{': '{', '}': '}', '/': '/', '\\': '\\', '&': '&',
                '@': '@', '#': '#', '$': '$', '%': '%', '^': '^', '*': '*', '+': '+', '=': '='
            };

            return this.mapCharacters(text, boldMap);
        },

        // Convert to italic Unicode characters - using LinkedIn-proven characters 
        convertToItalicUnicode(text) {
            // Using the exact LinkedIn-proven italic characters from the example
            const italicMap = {
                'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
                'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
                'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
                'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑',
                'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛',
                'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                ' ': ' ', ',': ',', '.': '.', '!': '!', '?': '?', ':': ':', ';': ';', '-': '-', '_': '_',
                '(': '(', ')': ')', '[': '[', ']': ']', '{': '{', '}': '}', '/': '/', '\\': '\\', '&': '&',
                '@': '@', '#': '#', '$': '$', '%': '%', '^': '^', '*': '*', '+': '+', '=': '='
            };

            return this.mapCharacters(text, italicMap);
        },

        // Convert to underline Unicode characters - using LinkedIn-proven characters
        convertToUnderlineUnicode(text) {
            // Use monospace font with combining underline
            const underlineMap = {
                'a': '𝚊̲', 'b': '𝚋̲', 'c': '𝚌̲', 'd': '𝚍̲', 'e': '𝚎̲', 'f': '𝚏̲', 'g': '𝚐̲', 'h': '𝚑̲', 'i': '𝚒̲', 'j': '𝚓̲',
                'k': '𝚔̲', 'l': '𝚕̲', 'm': '𝚖̲', 'n': '𝚗̲', 'o': '𝚘̲', 'p': '𝚙̲', 'q': '𝚚̲', 'r': '𝚛̲', 's': '𝚜̲', 't': '𝚝̲',
                'u': '𝚞̲', 'v': '𝚟̲', 'w': '𝚠̲', 'x': '𝚡̲', 'y': '𝚢̲', 'z': '𝚣̲',
                'A': '𝙰̲', 'B': '𝙱̲', 'C': '𝙲̲', 'D': '𝙳̲', 'E': '𝙴̲', 'F': '𝙵̲', 'G': '𝙶̲', 'H': '𝙷̲', 'I': '𝙸̲', 'J': '𝙹̲',
                'K': '𝙺̲', 'L': '𝙻̲', 'M': '𝙼̲', 'N': '𝙽̲', 'O': '𝙾̲', 'P': '𝙿̲', 'Q': '𝚀̲', 'R': '𝚁̲', 'S': '𝚂̲', 'T': '𝚃̲',
                'U': '𝚄̲', 'V': '𝚅̲', 'W': '𝚆̲', 'X': '𝚇̲', 'Y': '𝚈̲', 'Z': '𝚉̲',
                '0': '𝟶̲', '1': '𝟷̲', '2': '𝟸̲', '3': '𝟹̲', '4': '𝟺̲', '5': '𝟻̲', '6': '𝟼̲', '7': '𝟽̲', '8': '𝟾̲', '9': '𝟿̲',
                ' ': ' ̲', ',': ',̲', '.': '.̲', '!': '!̲', '?': '?̲', ':': ':̲', ';': ';̲', '-': '-̲', '_': '_̲',
                '(': '(̲', ')': ')̲', '[': '[̲', ']': ']̲', '{': '{̲', '}': '}̲', '/': '/̲', '\\': '\\̲', '&': '&̲',
                '@': '@̲', '#': '#̲', '$': '$̲', '%': '%̲', '^': '^̲', '*': '*̲', '+': '+̲', '=': '=̲'
            };

            return this.mapCharacters(text, underlineMap);
        },

        // Map characters using the provided map
        mapCharacters(text, charMap) {
            let result = '';

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                result += charMap[char] || char; // Use mapped char or original if not in map
            }

            return result;
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
        },

        // Add additional formatting options from the LinkedIn example

        // Bold-Italic formatting
        convertToBoldItalicUnicode(text) {
            const boldItalicMap = {
                'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗',
                'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡',
                'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
                'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
                'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
                'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                ' ': ' ', ',': ',', '.': '.', '!': '!', '?': '?', ':': ':', ';': ';', '-': '-', '_': '_',
                '(': '(', ')': ')', '[': '[', ']': ']', '{': '{', '}': '}', '/': '/', '\\': '\\', '&': '&',
                '@': '@', '#': '#', '$': '$', '%': '%', '^': '^', '*': '*', '+': '+', '=': '='
            };

            return this.mapCharacters(text, boldItalicMap);
        },

        // Strikethrough formatting
        convertToStrikethroughUnicode(text) {
            const strikethroughMap = {
                'a': '𝚊̶', 'b': '𝚋̶', 'c': '𝚌̶', 'd': '𝚍̶', 'e': '𝚎̶', 'f': '𝚏̶', 'g': '𝚐̶', 'h': '𝚑̶', 'i': '𝚒̶', 'j': '𝚓̶',
                'k': '𝚔̶', 'l': '𝚕̶', 'm': '𝚖̶', 'n': '𝚗̶', 'o': '𝚘̶', 'p': '𝚙̶', 'q': '𝚚̶', 'r': '𝚛̶', 's': '𝚜̶', 't': '𝚝̶',
                'u': '𝚞̶', 'v': '𝚟̶', 'w': '𝚠̶', 'x': '𝚡̶', 'y': '𝚢̶', 'z': '𝚣̶',
                'A': '𝙰̶', 'B': '𝙱̶', 'C': '𝙲̶', 'D': '𝙳̶', 'E': '𝙴̶', 'F': '𝙵̶', 'G': '𝙶̶', 'H': '𝙷̶', 'I': '𝙸̶', 'J': '𝙹̶',
                'K': '𝙺̶', 'L': '𝙻̶', 'M': '𝙼̶', 'N': '𝙽̶', 'O': '𝙾̶', 'P': '𝙿̶', 'Q': '𝚀̶', 'R': '𝚁̶', 'S': '𝚂̶', 'T': '𝚃̶',
                'U': '𝚄̶', 'V': '𝚅̶', 'W': '𝚆̶', 'X': '𝚇̶', 'Y': '𝚈̶', 'Z': '𝚉̶',
                '0': '0̶', '1': '1̶', '2': '2̶', '3': '3̶', '4': '4̶', '5': '5̶', '6': '6̶', '7': '7̶', '8': '8̶', '9': '9̶',
                ' ': ' ̶', ',': ',̶', '.': '.̶', '!': '!̶', '?': '?̶', ':': ':̶', ';': ';̶', '-': '-̶', '_': '_̶',
                '(': '(̶', ')': ')̶', '[': '[̶', ']': ']̶', '{': '{̶', '}': '}̶', '/': '/̶', '\\': '\\̶', '&': '&̶',
                '@': '@̶', '#': '#̶', '$': '$̶', '%': '%̶', '^': '^̶', '*': '*̶', '+': '+̶', '=': '=̶'
            };

            return this.mapCharacters(text, strikethroughMap);
        },

        // Bold Underline formatting
        convertToBoldUnderlineUnicode(text) {
            const boldUnderlineMap = {
                'a': '𝐚̲', 'b': '𝐛̲', 'c': '𝐜̲', 'd': '𝐝̲', 'e': '𝐞̲', 'f': '𝐟̲', 'g': '𝐠̲', 'h': '𝐡̲', 'i': '𝐢̲', 'j': '𝐣̲',
                'k': '𝐤̲', 'l': '𝐥̲', 'm': '𝐦̲', 'n': '𝐧̲', 'o': '𝐨̲', 'p': '𝐩̲', 'q': '𝐪̲', 'r': '𝐫̲', 's': '𝐬̲', 't': '𝐭̲',
                'u': '𝐮̲', 'v': '𝐯̲', 'w': '𝐰̲', 'x': '𝐱̲', 'y': '𝐲̲', 'z': '𝐳̲',
                'A': '𝐀̲', 'B': '𝐁̲', 'C': '𝐂̲', 'D': '𝐃̲', 'E': '𝐄̲', 'F': '𝐅̲', 'G': '𝐆̲', 'H': '𝐇̲', 'I': '𝐈̲', 'J': '𝐉̲',
                'K': '𝐊̲', 'L': '𝐋̲', 'M': '𝐌̲', 'N': '𝐍̲', 'O': '𝐎̲', 'P': '𝐏̲', 'Q': '𝐐̲', 'R': '𝐑̲', 'S': '𝐒̲', 'T': '𝐓̲',
                'U': '𝐔̲', 'V': '𝐕̲', 'W': '𝐖̲', 'X': '𝐗̲', 'Y': '𝐘̲', 'Z': '𝐙̲',
                '0': '0̲', '1': '1̲', '2': '2̲', '3': '3̲', '4': '4̲', '5': '5̲', '6': '6̲', '7': '7̲', '8': '8̲', '9': '9̲',
                ' ': ' ̲', ',': ',̲', '.': '.̲', '!': '!̲', '?': '?̲', ':': ':̲', ';': ';̲', '-': '-̲', '_': '_̲',
                '(': '(̲', ')': ')̲', '[': '[̲', ']': ']̲', '{': '{̲', '}': '}̲', '/': '/̲', '\\': '\\̲', '&': '&̲',
                '@': '@̲', '#': '#̲', '$': '$̲', '%': '%̲', '^': '^̲', '*': '*̲', '+': '+̲', '=': '=̲'
            };

            return this.mapCharacters(text, boldUnderlineMap);
        },

        // Bold Strikethrough formatting
        convertToBoldStrikethroughUnicode(text) {
            const boldStrikethroughMap = {
                'a': '𝐚̶', 'b': '𝐛̶', 'c': '𝐜̶', 'd': '𝐝̶', 'e': '𝐞̶', 'f': '𝐟̶', 'g': '𝐠̶', 'h': '𝐡̶', 'i': '𝐢̶', 'j': '𝐣̶',
                'k': '𝐤̶', 'l': '𝐥̶', 'm': '𝐦̶', 'n': '𝐧̶', 'o': '𝐨̶', 'p': '𝐩̶', 'q': '𝐪̶', 'r': '𝐫̶', 's': '𝐬̶', 't': '𝐭̶',
                'u': '𝐮̶', 'v': '𝐯̶', 'w': '𝐰̶', 'x': '𝐱̶', 'y': '𝐲̶', 'z': '𝐳̶',
                'A': '𝐀̶', 'B': '𝐁̶', 'C': '𝐂̶', 'D': '𝐃̶', 'E': '𝐄̶', 'F': '𝐅̶', 'G': '𝐆̶', 'H': '𝐇̶', 'I': '𝐈̶', 'J': '𝐉̶',
                'K': '𝐊̶', 'L': '𝐋̶', 'M': '𝐌̶', 'N': '𝐍̶', 'O': '𝐎̶', 'P': '𝐏̶', 'Q': '𝐐̶', 'R': '𝐑̶', 'S': '𝐒̶', 'T': '𝐓̶',
                'U': '𝐔̶', 'V': '𝐕̶', 'W': '𝐖̶', 'X': '𝐗̶', 'Y': '𝐘̶', 'Z': '𝐙̶',
                '0': '0̶', '1': '1̶', '2': '2̶', '3': '3̶', '4': '4̶', '5': '5̶', '6': '6̶', '7': '7̶', '8': '8̶', '9': '9̶',
                ' ': ' ̶', ',': ',̶', '.': '.̶', '!': '!̶', '?': '?̶', ':': ':̶', ';': ';̶', '-': '-̶', '_': '_̶',
                '(': '(̶', ')': ')̶', '[': '[̶', ']': ']̶', '{': '{̶', '}': '}̶', '/': '/̶', '\\': '\\̶', '&': '&̶',
                '@': '@̶', '#': '#̶', '$': '$̶', '%': '%̶', '^': '^̶', '*': '*̶', '+': '+̶', '=': '=̶'
            };

            return this.mapCharacters(text, boldStrikethroughMap);
        },

        // Script formatting
        convertToScriptUnicode(text) {
            const scriptMap = {
                'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳',
                'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽',
                'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
                'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙',
                'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣',
                'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                ' ': ' ', ',': ',', '.': '.', '!': '!', '?': '?', ':': ':', ';': ';', '-': '-', '_': '_',
                '(': '(', ')': ')', '[': '[', ']': ']', '{': '{', '}': '}', '/': '/', '\\': '\\', '&': '&',
                '@': '@', '#': '#', '$': '$', '%': '%', '^': '^', '*': '*', '+': '+', '=': '='
            };

            return this.mapCharacters(text, scriptMap);
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