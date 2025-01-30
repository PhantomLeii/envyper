from django.db import models
from django.utils.translation import gettext_lazy as _


class Variable(models.Model):
    ENV_TYPE = (
        ('DEV', 'Development'),
        ('TEST', 'Testing'),
        ('PROD', 'Production'),
    )
    
    key = models.CharField(_("Key"), max_length=150)
    value = models.CharField(_("Value"), max_length=256)
    env_type = models.CharField(_("Environment"), max_length=4, choices=ENV_TYPE, default='DEV')
    author_id = models.CharField(_("Author ID"), max_length=256)
    project_id = models.ForeignKey("projects.Project", verbose_name=_("Project ID"), on_delete=models.CASCADE)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    def __str__(self):
        return f"{self.key} - {self.project_id.name}"
        