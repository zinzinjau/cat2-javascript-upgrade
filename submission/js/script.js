document.addEventListener('DOMContentLoaded', function() {
    var programs = [
        { name: "Piano Lessons", price: "KSh 14,400", level: "Beginner" },
        { name: "Guitar Classes", price: "KSh 21,600", level: "Intermediate" },
        { name: "Vocal Training", price: "KSh 28,800", level: "Advanced" },
        { name: "Theory Course", price: "KSh 12,000", level: "All Levels" }
    ];

    var coursesSection = document.querySelector('.courses-section');
    if (coursesSection) {
        var heading = document.createElement('h3');
        heading.textContent = '🎵 Our Programs';
        heading.style.cssText = 'text-align: center; margin-top: 3rem; font-family: "DM Serif Display", serif; font-size: 1.8rem;';
        coursesSection.appendChild(heading);

        var container = document.createElement('div');
        container.style.cssText = 'display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin: 1rem 0;';

        programs.forEach(function(program) {
            var card = document.createElement('div');
            card.style.cssText = 'background: white; padding: 1.5rem; border-radius: 10px; border: 2px solid #f5a000; width: 180px; text-align: center;';
            card.innerHTML = '<h4>' + program.name + '</h4>' +
                             '<p style="color:#f5a000;font-weight:bold;">' + program.price + '</p>' +
                             '<p>' + program.level + '</p>';
            container.appendChild(card);
        });

        coursesSection.appendChild(container);
    }


     var wishForm = document.getElementById('wishlistForm');
    var wishInput = document.getElementById('wishlistInput');
    var wishList = document.getElementById('wishlistItems');

    // check its existance
    if (wishForm && wishInput && wishList) {
        console.log('Wishlist found, yayyyyyyyyyyyyyyy');

        
        function addWishlistItem(itemText, saveToStorage) {
            var trimmed = itemText.trim();
            if (trimmed === '') return;

            
            var li = document.createElement('li');

            
            var span = document.createElement('span');
            span.textContent = trimmed;

            // Delete button
            var delBtn = document.createElement('button');
            delBtn.textContent = 'gone';
            
            // Delete event
            delBtn.addEventListener('click', function() {
                li.remove();
                saveWishlist();
                console.log('Removed:', trimmed);
            });

            li.appendChild(span);
            li.appendChild(delBtn);
            wishList.appendChild(li);

            // Clear input
            wishInput.value = '';

            // Save to localStorage (if not loading from storage)
            if (saveToStorage !== false) {
                saveWishlist();
                console.log('Added:', trimmed);
            }
        }

        // Save current list to localStorage
        function saveWishlist() {
            var items = [];
            wishList.querySelectorAll('li span').forEach(function(span) {
                items.push(span.textContent);
            });
            localStorage.setItem('wishlist', JSON.stringify(items));
            console.log('Wishlist saved:', items);
        }

        // Load saved list from localStorage
        function loadWishlist() {
            var saved = localStorage.getItem('wishlist');
            if (saved) {
                try {
                    var items = JSON.parse(saved);
                    if (items.length > 0) {
                        items.forEach(function(item) {
                            addWishlistItem(item, false); // Don't save again
                        });
                        console.log('Loaded', items.length, 'items from storage.');
                    } else {
                        console.log('ℹWishlist is empty.');
                    }
                } catch (e) {
                    console.warn('Could not parse wishlist from localStorage.');
                }
            } else {
                console.log('ℹNo saved wishlist found.');
            }
        }

        // Handle form submit
        wishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addWishlistItem(wishInput.value);
        });

        // Load existing items on page load
        loadWishlist();
    }

      var contactForm = document.getElementById('cForm');
    var successDiv = document.getElementById('fSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var fname = document.getElementById('fname');
            var lname = document.getElementById('lname');
            var email = document.getElementById('email');
            var msg = document.getElementById('msg');

            var errors = [];
            if (fname.value.trim().length < 2) { errors.push('First name too short'); fname.style.borderColor = 'red'; } else { fname.style.borderColor = 'green'; }
            if (lname.value.trim().length < 2) { errors.push('Last name too short'); lname.style.borderColor = 'red'; } else { lname.style.borderColor = 'green'; }
            if (!email.value.includes('@')) { errors.push('Invalid email'); email.style.borderColor = 'red'; } else { email.style.borderColor = 'green'; }
            if (msg.value.trim().length < 5) { errors.push('Message too short'); msg.style.borderColor = 'red'; } else { msg.style.borderColor = 'green'; }

            if (errors.length > 0) {
                successDiv.innerHTML = '<div style="color:red;background:#ffe6e6;padding:1rem;border-radius:5px;"><strong>Errors:</strong><ul>' + 
                                       errors.map(function(e) { return '<li>' + e + '</li>'; }).join('') + '</ul></div>';
                successDiv.style.display = 'block';
            } else {
                successDiv.innerHTML = 'Thanks ' + fname.value + '! We\'ll reply to ' + email.value + ' soon.';
                successDiv.style.cssText = 'display: block; background: #e6ffe6; padding: 1rem; border-radius: 5px; margin-top: 1rem;';
                contactForm.reset();
                [fname, lname, email, msg].forEach(function(f) { f.style.borderColor = ''; });
            }
        });
    }