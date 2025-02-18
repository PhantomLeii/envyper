from django.db import models


class ProjectsManager(models.Manager):
    def create(self, **kwargs):
        """
        Ensure name and creator fields are provided before creating a project
        """
        name = kwargs.get("name")
        if not name:
            raise ValueError("Name is required")

        creator = kwargs.get("creator")
        if not creator:
            raise ValueError("Creator is required")

        return super().create(**kwargs)


class Projects(models.Model):
    creator = models.ForeignKey("users.User", on_delete=models.CASCADE)
    name = models.CharField(
        max_length=150,
    )
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ProjectsManager()

    def __str__(self):
        return self.name
