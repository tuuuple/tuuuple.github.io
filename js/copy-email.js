document.addEventListener('DOMContentLoaded', () => {
    const tooltipContainer = document.querySelector('.tooltip-container');
    const emailAnchor = tooltipContainer.querySelector('.email');
    const emailText = emailAnchor.querySelector('.email-text');
    const tooltip = tooltipContainer.querySelector('.tooltip');
    const icon = emailAnchor.querySelector('ion-icon');
    const emailToCopy = 'thu@thu-le.com';

    const handleCopyEmail = (event) => {
        if (event && event.type === 'touchstart') {
            event.preventDefault();
            tooltip.style.visibility = 'visible';
        }

        navigator.clipboard.writeText(emailToCopy).then(() => {
            tooltip.textContent = 'Copied';
            icon.setAttribute('name', 'checkmark-circle');
            setTimeout(() => {
                tooltip.textContent = 'Copy thu@thu-le.com';
                icon.setAttribute('name', 'copy-outline');
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const adjustTooltipPosition = () => {
        const emailTextWidth = emailText.offsetWidth;
        tooltip.style.left = `calc(50% - ${emailTextWidth / 2}px)`;
    };

    // Initial position adjustment
    adjustTooltipPosition();

    // Attach event listeners
    tooltipContainer.addEventListener('click', handleCopyEmail, {
        passive: true
    });
    tooltipContainer.addEventListener('touchstart', handleCopyEmail, {
        passive: true
    });
    tooltipContainer.addEventListener('touchend', handleCopyEmail, {
        passive: true
    });

    // Handle window resize
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    window.addEventListener('resize', debounce(adjustTooltipPosition, 200));
});
