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